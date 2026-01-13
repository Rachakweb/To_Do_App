import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { useState } from 'react';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <LoadingScreen onFinish={() => setIsLoading(false)} />;
    }

    return (
        <SafeAreaProvider>
            <HomeScreen />
        </SafeAreaProvider>
    );
}

AppRegistry.registerComponent('main', () => App);
if (typeof document !== 'undefined') {
    console.log('Mounting App...');
    document.body.style.backgroundColor = '#0F0F12'; // App theme background
    AppRegistry.runApplication('main', {
        initialProps: {},
        rootTag: document.getElementById('root'),
    });
}
