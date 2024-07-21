import { router } from 'expo-router';
import { Text, View } from 'react-native';
import {
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { useSession } from './context/ctx';
import FormField from '@/components/FormComponents/FormField';
import { TextInput } from '@/components/common/TextInput';
import Colors from '@/constants/Colors';
import React from 'react';

export interface FormValues extends FieldValues {
    name: string;
    description: string;
    isActive: boolean;
}

export default function SignIn() {
    const { signIn } = useSession();
    const [error, setError] = React.useState<boolean>(false);
    const { ...methods } = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onChange',
    });
    return (
        <FormProvider {...methods}>
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.dark.background[200],
                }}
            >
                <Text>Sign In</Text>
                <TextInput
                    name='username'
                    label='Username'
                    width={250}
                    labelColor={Colors.dark.grayCool[200]}
                    placeholder='violet ghost'
                    keyboardType='default'
                    rules={{
                        required: 'Username is required',
                        maxLength: 25,
                        minLength: 2,
                    }}
                    setFormError={setError}
                />
                <TextInput
                    name='password'
                    label='Password'
                    width={250}
                    labelColor={Colors.dark.grayCool[200]}
                    placeholder=''
                    keyboardType='default'
                    secureTextEntry={true}
                    rules={{
                        required: 'Password is required',
                        maxLength: 25,
                        minLength: 2,
                    }}
                    setFormError={setError}
                />
                <Text
                    onPress={async () => {
                        await signIn(
                            methods.getValues('username'),
                            methods.getValues('password')
                        );
                        router.replace('/');
                    }}
                >
                    Sign In
                </Text>
                <Text
                    onPress={() => {
                        // Navigate after signing in. You may want to tweak this to ensure sign-in is
                        // successful before navigating.
                        router.replace('/sign-up');
                    }}
                >
                    Dont have an account? Sign Up
                </Text>
            </View>
        </FormProvider>
    );
}
