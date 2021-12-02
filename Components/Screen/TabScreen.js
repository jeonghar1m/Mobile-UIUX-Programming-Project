import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LandingPage from './LandingPage/LandingPage';
import SearchPage from './SearchPage/SearchPage';
import NotificationPage from './NotificationPage/NotificationPage';
import SettingPage from './SettingPage/SettingPage';
import UserPage from './UserPage/UserPage';
import MovieDetailPage from './MovieDetailPage/MovieDetailPage';
import SearchResults from './SearchPage/Results/SearchResults';
// import { BottomNavigation } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();
const LandingStack = createStackNavigator();
const SearchStack = createStackNavigator();

const LandingPageScreen = () => {
    return (
        <LandingStack.Navigator screenOptions={{headerShown: false}}>
            <LandingStack.Screen name="LandingPage" component={LandingPage} />
            <LandingStack.Screen name="MovieDetailPage" component={MovieDetailPage} />
        </LandingStack.Navigator>
    )
}

const SearchPageScreen = () => {
    return (
        <SearchStack.Navigator screenOptions={{headerShown: false}}>
            <SearchStack.Screen name="SearchPage" component={SearchPage} />
            <SearchStack.Screen name="SearchResults" component={SearchResults} />
            <SearchStack.Screen name="MovieDetailPage" component={MovieDetailPage} />
        </SearchStack.Navigator>
    )
}

function TabScreen() {
    return (
        <Tab.Navigator
          initialRouteName="LandingPage"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          barStyle={{ backgroundColor: '#000000' }}
          labelStyle={{ fontSize: 12 }}
        >
            <Tab.Screen 
                name="Landing"
                component={LandingPageScreen} 
                options={{
                    tabBarLabel: '홈', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchPageScreen}
                options={{
                    tabBarLabel: '검색', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="magnify" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Notification" 
                component={NotificationPage} 
                options={{
                    tabBarLabel: '알림', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="bell" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingPage}
                options={{
                    tabBarLabel: '설정', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="cog" color={"#fff"} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Userpage"
                component={UserPage}
                options={{
                    tabBarLabel: '내 정보', 
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account" color={"#fff"} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
      )
}

export default TabScreen;
