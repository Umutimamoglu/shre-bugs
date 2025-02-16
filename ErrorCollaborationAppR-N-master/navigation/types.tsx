import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IAllBugs, IBug } from '../types';

export type HomeStackParamlist = {
    Home: undefined;
};

export type AppStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList>;
    Settings: undefined;
};

export type AuthStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
};

export type RootBottomTabParamList = {
    HomeStack: NavigatorScreenParams<HomeStackParamlist>;
    Today: undefined;
    MyBugs: NavigatorScreenParams<BugsStackParamList>;
    Feed: NavigatorScreenParams<AllBugsStackParamList>;
    Profile: undefined;
    CategoriesStack: NavigatorScreenParams<CategoriesStackParamList>;
};

export type BugsNavigationType = NativeStackNavigationProp<BugsStackParamList>;
export type AllBugsNavigationType = NativeStackNavigationProp<AllBugsStackParamList>;

export type BugsStackParamList = {
    Bugs: undefined;
    BugDetail: {
        bug: IBug;
    };

};

export type AllBugsStackParamList = {
    AllBugs: undefined;
    AllBugDetail: { bug: IAllBugs };
    ChatScreen: { bug: IAllBugs };
    FavoriBugs: undefined
    FavoriBugDettail: { bug: IAllBugs }
};

export type CategoriesStackParamList = {
    Categories: undefined;
    Category: {
        id: string;
    };
    CreateCategory: undefined;
};

export type AuthScreenNavigationType<
    RouteName extends keyof AuthStackParamList
> = CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, RouteName>,
    NativeStackNavigationProp<AppStackParamList, 'Root'>
>;
