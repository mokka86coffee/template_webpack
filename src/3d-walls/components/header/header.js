import React from 'react';
import styles from './header.scss';
import cx from 'classnames';

export default (props) => {
    return (
        <header className={styles.header}>
            <span className={styles.fontDigit}>01</span>
            <span 
                className={cx(styles.fontTitle, { 
                    [styles['fontTitle--animate-start']]: props.animate 
                })}
            >
                Gypsum 3D Wall Panels
            </span>
        </header>
    )
}