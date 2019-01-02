import React, { Fragment, FunctionComponent } from 'react';
import ContentBlock from '../../atoms/ContentBlock';
import ContentHeader from '../../molecules/ContentHeader';
import { SelectedAccommodationQuery_accommodation } from '../../../entities/schemaTypes';
import { LanguagesInputBlock } from '../../molecules/LanguagesInputBlock';
import PrimarySpanText from '../../atoms/PrimarySpanText';
import { Divider } from '../../atoms/Divider';

interface Props {
    accommodation?: SelectedAccommodationQuery_accommodation;
}

export const InfoDescription: FunctionComponent<Props> = ({ accommodation }: Props) => {
    return (
        <Fragment>
            <ContentHeader>
                <h1>Omschrijving van het vakantiehuisje</h1>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, fuga ducimus cum vel optio,
                perferendis deleniti deserunt sed reiciendis cumque tempore saepe a illo voluptas nesciunt sit? Eos,
                quas nihil.
            </ContentHeader>
            <Divider />
            <ContentBlock>
                <h2>Korte Omschrijving</h2>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil minus iste nobis sit deserunt
                    consequuntur non nam. Eum, omnis ullam nam nemo cumque ut aperiam, laudantium non optio id suscipit?
                </p>
                <h4>
                    Korte Omschrijving <PrimarySpanText>max. 300 karakters</PrimarySpanText>
                </h4>
                <LanguagesInputBlock name="description" />
            </ContentBlock>
            <Divider />
            <ContentBlock>
                <h4>
                    Omschrijving <PrimarySpanText>max. 900 karakters</PrimarySpanText>
                </h4>
                <LanguagesInputBlock big name="description" />
            </ContentBlock>
        </Fragment>
    );
};
