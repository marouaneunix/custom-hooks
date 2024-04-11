import { fireEvent, render, screen } from "@testing-library/react"
import { ChangeEvent } from "react";
import { useOnlineStatus } from ".";





const Target = () => {
    const {status} = useOnlineStatus();

    return (
        <>
            <div className={status} data-testid="target">{status}</div>
        </>
    )
}



describe('useOnlineStatus hook', () => {
    it('should return online when online', () => {
        Object.defineProperty(window.navigator, 'onLine', {
            value: true,
            configurable: true,
        });

        render(<Target />);

        const target = screen.getByTestId('target');
        expect(target).toHaveClass('online');
        expect(target).toHaveTextContent('online');
    })

    it('should return offline when offline', () => {
        Object.defineProperty(window.navigator, 'onLine', {
            value: false,
            configurable: true,
        });

        render(<Target />);
        const target = screen.getByTestId('target');
        expect(target).toHaveClass('offline');
        expect(target).toHaveTextContent('offline');
    })
})