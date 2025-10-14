import { useEffect, type RefObject } from 'react';

export default function useClickOutside(ref: RefObject<HTMLElement | null>, onClickOutside: () => void, trigger?: RefObject<HTMLElement | null>) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            const clickedOutsideRef = ref.current && !ref.current.contains(target);
            const clickedOutsideTrigger = trigger?.current ? !trigger.current.contains(target) : true;

            if (clickedOutsideRef && clickedOutsideTrigger) {
                onClickOutside();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, trigger, onClickOutside]);
}
