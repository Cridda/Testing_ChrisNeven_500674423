import { FunctionComponent, Fragment } from 'react';
import React from 'react';
import ModalProvider from '../../reusable/MakeModal';
import { Divider } from '../../atoms/Divider';
import ContentBlock from '../../atoms/ContentBlock';
import { BathroomInputTypes } from './BathroomContainer';
import { Field } from 'formik';
import InputWithToggle from '../InputWithToggle';
import { PrimaryButton } from '../../atoms/PrimaryButton';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';
import SecondaryButton from '../../atoms/SecondaryButton';
import DeleteButton from '../../atoms/DeleteButton';

const Container = styled.div`
    padding: 2rem 5rem 3rem 5rem;
`;

interface Props {
    edit?: boolean;
}

const BathroomModal: FunctionComponent<Props> = ({ edit }) => (
    <ModalProvider>
        {({ onCloseModal, open, onOpenModal }) => {
            return (
                <Fragment>
                    <Modal open={open} center onClose={onCloseModal}>
                        <Container>
                            <h1>Badkamer toevoegen</h1>
                            {edit && <DeleteButton>Verwijderen</DeleteButton>}
                            <Divider />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolores incidunt ipsa,
                                earum nobis beatae facilis, dolore harum vitae nihil molestias repudiandae non quisquam
                                ab. Omnis unde atque voluptate ipsa!
                            </p>
                            <ContentBlock>
                                <h4>Type</h4>
                                <BathroomInputTypes />
                                <h4>Toilet</h4>
                                <Field name="toilet" options={[0, 1, 2, 3, 4, 5]} component={InputWithToggle} />
                                <h4>Douche</h4>
                                <Field name="shower" options={[0, 1, 2, 3, 4, 5]} component={InputWithToggle} />
                                <h4>Bad</h4>
                                <Field name="bath" options={[0, 1, 2, 3, 4, 5]} component={InputWithToggle} />
                            </ContentBlock>
                            <Divider />
                            <PrimaryButton onClick={onCloseModal} type="button">
                                {!edit ? 'Badkamer toevoegen' : 'Wijzigingen opslaan'}
                            </PrimaryButton>
                        </Container>
                    </Modal>
                    <SecondaryButton onClick={onOpenModal} type="button">
                        Badkamer toevoegen
                    </SecondaryButton>
                </Fragment>
            );
        }}
    </ModalProvider>
);

export default BathroomModal;
