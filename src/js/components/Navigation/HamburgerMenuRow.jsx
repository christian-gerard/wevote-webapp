import styled from 'styled-components';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { renderLog } from '../../common/utils/logging';

const SettingsAccountLevelChip = React.lazy(() => import(/* webpackChunkName: 'SettingsAccountLeveLChip' */ '../Settings/SettingsAccountLevelChip'));


class HamburgerMenuRow extends Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.onClickAction = this.props.onClickAction ? this.props.onClickAction.bind(this) : null;
  }

  render () {
    renderLog('HamburgerMenuRow');  // Set LOG_RENDER_EVENTS to log all renders
    const indented = this.props.indented !== undefined;
    const { showProChip } = this.props;

    if (indented) {
      // "indented" not currently used
      return (
        <tr className="hamburger-menu__tr">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <td className="hamburger-menu__td-0">
            &nbsp;
          </td>
          <td className="hamburger-menu__td-1">
            <Link onClick={this.onClickAction} to={this.props.to}>
              {this.props.fullIcon ? this.props.fullIcon :
              <span className={this.props.icon} style={this.props.iconStyle} />}
            </Link>
          </td>
          <td className="hamburger-menu__td-2">
            <Link onClick={this.onClickAction} to={this.props.to}>
              <LinkTextWrapper>
                {this.props.linkText}
                {showProChip ? (
                  <Suspense fallback={<></>}>
                    <SettingsAccountLevelChip onClickDisabled requiredFeaturePackage="PROFESSIONAL" />
                  </Suspense>
                ) : null}
              </LinkTextWrapper>
            </Link>
          </td>
        </tr>
      );
    } else {
      return (
        <tr className="hamburger-menu__tr">
          <td className="hamburger-menu__td-0">
            <Link onClick={this.onClickAction} to={this.props.to}>
              {this.props.fullIcon ? this.props.fullIcon :
              <span className={this.props.icon} style={this.props.iconStyle} />}
            </Link>
          </td>
          <td className="hamburger-menu__td-1" colSpan={2}>
            <Link onClick={this.onClickAction} to={this.props.to}>
              <LinkTextWrapper>
                {this.props.linkText}
                {showProChip ? <SettingsAccountLevelChip onClickDisabled requiredFeaturePackage="PROFESSIONAL" /> : null}
              </LinkTextWrapper>
            </Link>
          </td>
        </tr>
      );
    }
  }
}
HamburgerMenuRow.propTypes = {
  fullIcon: PropTypes.object,
  icon: PropTypes.string,
  iconStyle: PropTypes.object,
  indented: PropTypes.bool,
  linkText: PropTypes.string.isRequired,
  onClickAction: PropTypes.func,
  showProChip: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

const styles = () => ({
  indicator: {
    height: 4,
  },
});

const LinkTextWrapper = styled('div')`
  width: 100%;
`;

export default withStyles(styles)(HamburgerMenuRow);
