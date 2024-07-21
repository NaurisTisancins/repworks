import { StyleSheet, Text, View } from 'react-native';
import ActiveRoutineView from '../../../components/ActiveRoutineView';
import { observer } from 'mobx-react';
import { useStore } from '../../../store';
import { useEffect } from 'react';
import Colors from '../../../constants/Colors';
import { useSession } from '@/app/context/ctx';

const HomeScreen = () => {
    const {
        RoutineStore: { getActiveRoutines },
    } = useStore();
    const { session } = useSession();

    useEffect(() => {
        if (session) getActiveRoutines(session);
    }, []);

    return (
        <View style={styles.container}>
            <ActiveRoutineView />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background[600],
        paddingHorizontal: 14,
        paddingVertical: 30,
        gap: 20,
    },
});

export default observer(HomeScreen);
