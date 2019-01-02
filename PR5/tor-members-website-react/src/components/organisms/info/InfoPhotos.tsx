import React, { Fragment, useState, FunctionComponent } from 'react';
import { SelectedAccommodationQuery_accommodation, PhotoFragment } from '../../../entities/schemaTypes';
import ContentHeader from '../../molecules/ContentHeader';
import { Divider } from '../../atoms/Divider';
import ContentBlock from '../../atoms/ContentBlock';
import styled from 'styled-components';
import SecondaryButton from '../../atoms/SecondaryButton';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { GalleryPhoto } from '../../atoms/GalleryPhoto';
import gql from 'graphql-tag';
import { device } from '../../../constants/theme';

export const photoFragment = gql`
    fragment PhotoFragment on Photo {
        id
        name {
            en
            nl
            de
        }
        url
    }
`;

interface Props {
    accommodation: SelectedAccommodationQuery_accommodation;
}

interface SortableItemProps {
    src: string;
    first: boolean;
}
const SortableItem = SortableElement(({ src, first }: SortableItemProps) => <GalleryPhoto first={first} src={src} />);

const SortableList = SortableContainer(({ photos }: { photos: PhotoFragment[] }) => {
    return (
        <PhotoBlock>
            {photos.map((photo: PhotoFragment, index: number) => {
                return <SortableItem first={index === 0} key={photo.id} index={index} src={photo.url} />;
            })}
        </PhotoBlock>
    );
});

const InfoPhotos: FunctionComponent<Props> = ({ accommodation }) => {
    console.log(accommodation);
    const [photos, setPics] = useState(accommodation.photos);
    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        setPics(arrayMove(photos, oldIndex, newIndex));
    };

    return (
        <Fragment>
            <ContentHeader>
                <h1>Foto's van het {accommodation.type.name}</h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore quia reprehenderit minima nisi
                voluptates.
            </ContentHeader>
            <Divider />
            <StyledContentBlock threeColumns>
                <h2>Gallerij</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam praesentium enim modi fugiat
                    voluptatem, atque quod eveniet mollitia quas deleniti.
                </p>

                <SecondaryButton>Foto toevoegen</SecondaryButton>
            </StyledContentBlock>
            {photos && (
                <SortableList
                    onSortOver={() => console.log('started moving')}
                    helperClass={'dragging-helper-class'}
                    axis={'xy'}
                    photos={photos}
                    onSortEnd={onSortEnd}
                    lockToContainerEdges={true}
                />
            )}
            <Divider />
        </Fragment>
    );
};

export default InfoPhotos;

const StyledContentBlock = styled(ContentBlock)`
    @media ${device.m} {
        grid-template-columns: 0.3fr 1.2fr 0.5fr;
    }
    margin-bottom: 2rem;
    > button {
        margin: 1rem;
    }
`;
const PhotoBlock = styled.ul`
    margin: 0;
    padding: 0;
    display: grid;
    width: 100%;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    grid-template-columns: 1fr;
    @media ${device.xs} {
        grid-template-columns: 0.5fr 0.5fr;
    }
    @media ${device.s} {
        grid-template-columns: 0.33fr 0.33fr 0.33fr;
    }
    @media ${device.m} {
        grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
    }
`;
