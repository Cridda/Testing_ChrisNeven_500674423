import React, { Component, Fragment, ReactNode } from 'react';

interface State {
    open: boolean;
}

interface InjectedModalProps {
    onCloseModal: () => void;
    onOpenModal: () => void;
    open: boolean;
}

interface ModalProps {
    children(props: InjectedModalProps): ReactNode;
}
class ModalProvider extends Component<ModalProps, State> {
    state: State = {
        open: false
    };
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        const { children } = this.props;
        return (
            <Fragment>
                {children({
                    onCloseModal: this.onCloseModal,
                    onOpenModal: this.onOpenModal,
                    open
                })}
            </Fragment>
        );
    }
}

export default ModalProvider;
