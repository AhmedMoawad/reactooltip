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
        padding: '6px 6px 6px 6px',
        fontWeight: 'normal',
        borderRadius: '2px',
        zIndex: 7,
        boxSizing: 'border-box',
        display: 'inline-block',
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
        display: 'inline-block',
        cursor: 'pointer'
    },
    wrapperChild: {
        width: 'auto',
    }
};

class Reactooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tooltipOpened: false, wrapperWidth: 0 };
        this.handleEvent = this.handleEvent.bind(this);
        this.wrapper = null;
    }

    handleEvent(tooltipOpened = false, event = 'hover') {
        if (!tooltipOpened || this.props.events.includes(event)) {
            this.setState({ tooltipOpened });
        }
    }

    componentDidMount() {
        this.setState({ wrapperWidth: this.wrapper.clientWidth });
    }

    calculateTooltipWidth() {
        if (this.props.width) {
            return this.props.width;
        }
        const tooltip = document.createElement('div');
        tooltip.textContent = this.props.content;
        tooltip.style.display = 'inline-block';
        document.body.appendChild(tooltip);
        const tooltipWidth = tooltip.clientWidth;
        document.body.removeChild(tooltip);
        return tooltipWidth;
    }

    render() {
        const { content, children, customClass, contentAlign, opened } = this.props;
        const { wrapperWidth, tooltipOpened } = this.state;
        const tooltipWidth = this.calculateTooltipWidth();
        const tooltipLeft = `${(wrapperWidth - tooltipWidth) / 2}px`;
        const arrowLeft = `${(tooltipWidth - 12) / 2}px`;
        const shouldActivate = tooltipOpened || opened;
        return (
            <div
                ref={(wrapper) => {this.wrapper = wrapper} }
                className={`reactooltip-w ${customClass || ''}`}
                style={styles.wrapper}
                onMouseEnter={() => this.handleEvent(true)}
                onMouseLeave={() => this.handleEvent()}
                onClick={() => this.handleEvent(true, 'click')}
            >
                {shouldActivate && (
                    <div
                        className="reactooltip"
                        style={{
                            ...styles.tooltip,
                            width: `${tooltipWidth}px`,
                            left: tooltipLeft,
                            textAlign: contentAlign,
                        }}
                    >
                        <span>{content}</span>
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
                                width: `${tooltipWidth}px`
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
    events: ['hover'],
    opened: false,
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
    events: PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click'])),
    opened: PropTypes.bool,
};

export default Reactooltip;
