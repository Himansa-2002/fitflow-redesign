# React Native Android on Windows: avoids MAX_PATH failures during New Architecture
# CMake/ninja builds when the project lives in a deep folder (e.g. Desktop\...\FitFlow).
#
# Usage (from FitFlow root):
#   npm run android:windows
#   npm run android:windows -- --port 8082
# Extra args after -- are forwarded to react-native run-android.

$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

function Test-LongPathsEnabled {
    try {
        $val = Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name LongPathsEnabled -ErrorAction Stop
        return $val.LongPathsEnabled -eq 1
    } catch {
        return $false
    }
}

function Get-EstimatedNativeObjectPathLength([string]$Root) {
    $normalized = $Root.TrimEnd('\')
    $cwd = Join-Path $normalized "android\app\.cxx\Debug\q5f6g6r1\arm64-v8a"
    $rel = "safeareacontext_autolinked_build/CMakeFiles/react_codegen_safeareacontext.dir/C_/$($normalized -replace '\\','/')/node_modules/react-native-safe-area-context/common/cpp/react/renderer/components/safeareacontext/RNCSafeAreaViewShadowNode.cpp.o"
    return (Join-Path $cwd ($rel -replace '/', '\')).Length
}

function Remove-TreeLong([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) { return }
    $long = if ($Path.StartsWith("\\?\")) { $Path } else { "\\?\$((Resolve-Path -LiteralPath $Path).Path)" }
    cmd /c "rmdir /s /q `"$long`"" | Out-Null
}

function Get-SubstDriveForProject([string]$TargetRoot) {
    $target = (Resolve-Path $TargetRoot).Path.TrimEnd('\').ToUpperInvariant()
    $lines = cmd /c subst 2>$null
    foreach ($line in $lines) {
        if ($line -match '^([A-Z]):\\: => (.+)$') {
            $drive = $matches[1]
            $mapped = $matches[2].TrimEnd('\').ToUpperInvariant()
            if ($mapped -eq $target) {
                return $drive
            }
        }
    }
    foreach ($letter in @("W", "R", "F", "Z", "Y", "X")) {
        $inUse = $lines | Where-Object { $_ -match "^${letter}:\\:" -or $_ -match "^${letter}:\\\\:" }
        if (-not $inUse) {
            return $letter
        }
    }
    throw "No free drive letter for SUBST. Run 'subst' and free a letter, or enable Windows long paths."
}

$estimatedLen = Get-EstimatedNativeObjectPathLength -Root $ProjectRoot
Write-Host "Estimated worst-case native object path length from current folder: $estimatedLen chars (Windows limit ~260)."

$useSubst = $estimatedLen -gt 250 -and -not (Test-LongPathsEnabled)
$buildRoot = $ProjectRoot

if ($useSubst) {
    Write-Host ""
    Write-Host "Path is too long for New Architecture C++ builds with default Windows limits."
    Write-Host "Building via SUBST to a short drive letter (recommended on Windows)."
    Write-Host "Permanent fix (Admin): enable LongPathsEnabled, then reboot."
    Write-Host ""

    $DriveLetter = Get-SubstDriveForProject -TargetRoot $ProjectRoot
    $drivePath = "${DriveLetter}:\"
    $already = (cmd /c subst 2>$null) | Where-Object { $_ -match "^${DriveLetter}:\\:" }
    if (-not $already) {
        Write-Host "Mapping ${DriveLetter}: -> $ProjectRoot"
        cmd /c "subst ${DriveLetter}: `"$ProjectRoot`"" | Out-Null
    } else {
        Write-Host "Using existing ${DriveLetter}: -> $ProjectRoot"
    }
    $buildRoot = $drivePath
} elseif ($estimatedLen -gt 250) {
    Write-Host "Long paths appear enabled; building from the current directory."
}

Push-Location $buildRoot
try {
    $cxx = Join-Path $ProjectRoot "android\app\.cxx"
    if (Test-Path -LiteralPath $cxx) {
        Write-Host "Removing android\app\.cxx (CMake cache; safe to delete)..."
        Remove-TreeLong -Path $cxx
    }

    $rnArgs = @("run-android") + $args

    Write-Host ""
    if ($useSubst) {
        Write-Host "Metro: run 'npm start' from the Desktop project path, not the SUBST drive (avoids F:\ watcher errors)."
    } else {
        Write-Host "Metro: run 'npm start' in a second terminal before or during install."
    }
    Write-Host "      Use one Metro on port 8081, or pass --port 8082 to run-android."
    Write-Host ""

    Write-Host "Running: npx react-native $($rnArgs -join ' ') (from $buildRoot)"
    npx react-native @rnArgs
    exit $LASTEXITCODE
} finally {
    Pop-Location
}
