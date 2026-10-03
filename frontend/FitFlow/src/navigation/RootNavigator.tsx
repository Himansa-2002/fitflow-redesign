import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Dumbbell,
  Home,
  TrendingUp,
  Users,
  Utensils,
} from 'lucide-react-native';
import {COLORS} from '../theme';
import {RootStackParamList, TabParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import WorkoutPlanScreen from '../screens/WorkoutPlanScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import ProgressScreen from '../screens/ProgressScreen';
import CommunityScreen from '../screens/CommunityScreen';
import NutritionScreen from '../screens/NutritionScreen';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelStyle: {fontSize: 11, fontWeight: '600'},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarIcon: ({color, size}) => <Home color={color} size={size} />}}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{tabBarIcon: ({color, size}) => <Dumbbell color={color} size={size} />}}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{tabBarIcon: ({color, size}) => <TrendingUp color={color} size={size} />}}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{tabBarIcon: ({color, size}) => <Users color={color} size={size} />}}
      />
      <Tab.Screen
        name="Nutrition"
        component={NutritionScreen}
        options={{tabBarIcon: ({color, size}) => <Utensils color={color} size={size} />}}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="WorkoutPlan" component={WorkoutPlanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}