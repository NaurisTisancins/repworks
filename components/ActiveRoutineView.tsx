import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../store/index';
import { observer } from 'mobx-react';
import ActiveRoutineListItem from './ActiveRoutineListItem';
import Button from './common/Button';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { useSession } from '@/app/context/ctx';

function ActiveRoutineView() {
    const {
        RoutineStore: { activeRoutines, setSelectedRoutine },
    } = useStore();
    const { signOut } = useSession();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Current Routine</Text>
            {activeRoutines.length > 0 ? (
                <View>
                    {activeRoutines.map((routine) => (
                        <ActiveRoutineListItem
                            routine={routine}
                            key={routine.routine_id}
                        />
                    ))}
                </View>
            ) : (
                <View>
                    <Text style={styles.noRoutines}>
                        You have no active routines
                    </Text>
                    <Button
                        title={'Add routine'}
                        onButtonPress={() => {
                            setSelectedRoutine(null);
                            router.push('/routine/createRoutine');
                        }}
                    />
                    <Text style={styles.separatorText}>Or</Text>
                    <Button
                        title={'Browse routines'}
                        onButtonPress={() => router.push('/routine/routines')}
                    />
                    <Text
                        onPress={() => {
                            signOut();
                            router.replace('/sign-in');
                        }}
                    >
                        Sign Out
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
    },
    title: {
        color: Colors.dark.grayCool[200],
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
    },
    noRoutines: {
        color: Colors.dark.grayCool[200],
        marginBottom: 10,
    },

    separatorText: {
        color: Colors.dark.grayCool[200],
        display: 'flex',
        textAlign: 'center',
        width: '100%',
        padding: 10,
        fontSize: 16,
        fontWeight: '800',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default observer(ActiveRoutineView);
