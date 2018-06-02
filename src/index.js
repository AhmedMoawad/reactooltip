import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    tooltip: {
        position: 'absolute',
        bottom: '21px',
        backgroundColor: '#3a3a3a',
        fontSize: '12px',
        lineHeight: 1.33,
        color: '#ffffff',
        padding: '10px 10px 10px 10px',
        fontWeight: 'normal',
        borderRadius: '2px',
        zIndex: 7,
        boxSizing: 'border-box'
    },
    arrow: {
        position: 'absolute',
        bottom: '-5px',
        width: 0,
        height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid #3a3a3a',
    },
    empty: {
        position: 'absolute',
        bottom: '-5px',
        left: '0px',
        height: '6px',
        background: '#ffffff',
        opacity: 0
    },
    wrapper: {
        position: 'relative',
        display: 'inline-block'
    },
    wrapperChild: {
        width: 'auto',
    }
};

class Reactooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = { opened: false, wrapperWidth: 0 };
        this.handleHover = this.handleHover.bind(this);
        this.wrapper = null;
    }

    handleHover(opened = false) {
        this.setState({ opened });
    }

    componentDidMount() {
        this.setState({ wrapperWidth: this.wrapper.clientWidth });
    }

    render() {
        const { content, children, width, customClass, contentAlign } = this.props;
        const { wrapperWidth, opened } = this.state;
        const tooltipLeft = `${(wrapperWidth - width) / 2}px`;
        const arrowLeft = `${(width - 12) / 2}px`;
        return (
            <div
                ref={(wrapper) => {this.wrapper = wrapper} }
                className={`reactooltip-w ${customClass || ''}`}
                style={styles.wrapper}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
            >
                {opened && (
                    <div
                        className="reactooltip"
                        style={{
                            ...styles.tooltip,
                            width: `${width}px`,
                            left: tooltipLeft,
                            textAlign: contentAlign,
                        }}
                    >
                        {content}
                        <div
                            className="reactooltip__arrow"
                            style={{
                                ...styles.arrow,
                                left: arrowLeft
                            }} />
                        <div
                            className="reactooltip__empty-area"
                            style={{
                                ...styles.empty,
                                width: `${width}px`
                            }}
                        />
                    </div>
                )}
                <div
                    className="reactooltip-w__child"
                    style={styles.wrapperChild}
                >{children}</div>
            </div>
        );
    }
}

Reactooltip.defaultProps = {
    contentAlign: 'center',
    width: 100
};

Reactooltip.propTypes = {
    content: PropTypes.string.isRequired,
    children: PropTypes.oneOf([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    width: PropTypes.number,
    contentAlign: PropTypes.oneOf(['right', 'left', 'center']),
    customClass: PropTypes.string.isRequired,
};

export default Reactooltip;
