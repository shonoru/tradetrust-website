import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import { getData } from "@govtechsg/open-attestation";

import {
  updateCertificate,
  sendCertificate,
  sendCertificateReset,
  getCertificate,
  getVerifying,
  getEmailSendingState,
  getVerificationStatus,
  updateObfuscatedCertificate
} from "../reducers/certificate";
import CertificateViewer from "./CertificateViewer";

class MainPageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSharing: false,
      detailedVerifyVisible: false
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleSharingToggle = this.handleSharingToggle.bind(this);
    this.handleSendCertificate = this.handleSendCertificate.bind(this);
  }

  componentDidMount() {
    const { document } = this.props;
    if (!document) {
      Router.replace("/");
    }
  }

  handleSharingToggle() {
    this.props.sendCertificateReset();
    this.setState({ showSharing: !this.state.showSharing });
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  handleSendCertificate({ email, captcha }) {
    this.props.sendCertificate({ email, captcha });
  }

  render() {
    if (!this.props.document) return null;
    return (
      <CertificateViewer
        document={this.props.document}
        certificate={getData(this.props.document)}
        verifying={this.props.verifying}
        verificationStatus={this.props.verificationStatus}
        handleCertificateChange={this.handleCertificateChange}
        showSharing={this.state.showSharing}
        emailAddress={this.state.emailAddress}
        handleSendCertificate={this.handleSendCertificate}
        handleSharingToggle={this.handleSharingToggle}
        emailSendingState={this.props.emailSendingState}
        detailedVerifyVisible={this.state.detailedVerifyVisible}
      />
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),

  // Verification statuses used in verifier block
  emailSendingState: getEmailSendingState(store),
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  sendCertificate: payload => dispatch(sendCertificate(payload)),
  sendCertificateReset: () => dispatch(sendCertificateReset()),
  updateObfuscatedCertificate: updatedDoc =>
    dispatch(updateObfuscatedCertificate(updatedDoc))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer);

MainPageContainer.propTypes = {
  updateCertificate: PropTypes.func,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  verificationStatus: PropTypes.object,
  emailSendingState: PropTypes.string,
  sendCertificate: PropTypes.func,
  sendCertificateReset: PropTypes.func,
  updateObfuscatedCertificate: PropTypes.func
};
