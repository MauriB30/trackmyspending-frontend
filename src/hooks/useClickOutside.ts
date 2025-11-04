import { useEffect, type RefObject } from 'react';

export default function useClickOutside(
    contentRef: RefObject<HTMLElement | null>,
    onClickOutside: () => void,
    triggerRef?: RefObject<HTMLElement | null>
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const clickedElement = event.target as Node;

            const isClickOutsideContent = contentRef.current && !contentRef.current.contains(clickedElement);
            const isClickOutsideTrigger = triggerRef?.current ? !triggerRef.current.contains(clickedElement) : true;

            if (isClickOutsideContent && isClickOutsideTrigger) {
                onClickOutside();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contentRef, triggerRef, onClickOutside]);
}
