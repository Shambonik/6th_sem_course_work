import { useCallback, useState } from 'react';

type UseBooleanValue = [boolean, () => void, () => void, () => void];

/**
 * @param initState значение по умолчние
 * @returns [stateBool, setToPositive, setToNegative, toggle]
 */
export const useBoolean = (initState?: boolean): UseBooleanValue => {
    const [stateBool, setStateBool] = useState<boolean>(!!initState);

    const setToPositive = useCallback(() => setStateBool(true), []);
    const setToNegative = useCallback(() => setStateBool(false), []);
    const toggle = useCallback(() => setStateBool(state => !state), []);

    return [stateBool, setToPositive, setToNegative, toggle];
};
