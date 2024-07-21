import { Stack, router } from 'expo-router';
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

export default function SignUp() {
    const { signUp } = useSession();
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
                <Text>Sign Up</Text>
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
                    onPress={() => {
                        signUp(
                            methods.getValues('username'),
                            methods.getValues('password')
                        );
                        // Navigate after signing in. You may want to tweak this to ensure sign-in is
                        // successful before navigating.
                        router.replace('/');
                    }}
                >
                    Submit
                </Text>
                <Text
                    onPress={() => {
                        router.replace('/sign-in');
                    }}
                >
                    Allready have an account? Sign In
                </Text>
            </View>
        </FormProvider>
    );
}
