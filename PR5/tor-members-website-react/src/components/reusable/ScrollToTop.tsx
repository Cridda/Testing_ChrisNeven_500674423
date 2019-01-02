import { PureComponent, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}
export class ScrollToTop extends PureComponent<Props> {
    componentDidMount = () => window.scrollTo(0, 0);
    componentDidUpdate = () => {
        window.scrollTo(0, 0);
    };

    render = () => this.props.children;
}
