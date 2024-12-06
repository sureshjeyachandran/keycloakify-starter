import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, Typography } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

export default function LoginResetOtp(props: PageProps<Extract<KcContext, { pageId: "login-reset-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, messagesPerField, configuredOtpCredentials } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-reset-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcInputWrapperClass")}>
                    <div className={kcClsx("kcInfoAreaWrapperClass")}>
                        {/* <p id="kc-otp-reset-form-description">{msg("otp-reset-description")}</p> */}
                        <Typography  sx={{ fontSize: 16 }}>
                            {msg("otp-reset-description")}
                        </Typography>
                        {configuredOtpCredentials.userOtpCredentials.map((otpCredential, index) => (
                            <Fragment key={otpCredential.id}>
                                <div style={{margin: 1, display: "inline-flex"}}>
                                    <input
                                        id={`kc-otp-credential-${index}`}
                                        className={kcClsx("kcLoginOTPListInputClass")}
                                        type="radio"
                                        name="selectedCredentialId"
                                        value={otpCredential.id}
                                        defaultChecked={otpCredential.id === configuredOtpCredentials.selectedCredentialId}
                                    />
                                    <label htmlFor={`kc-otp-credential-${index}`} className={kcClsx("kcLoginOTPListClass")} tabIndex={index}>
                                        <span className={kcClsx("kcLoginOTPListItemHeaderClass")}>
                                            {/* <span className={kcClsx("kcLoginOTPListItemIconBodyClass")}>
                                                <i className={kcClsx("kcLoginOTPListItemIconClass")} aria-hidden="true"></i>
                                            </span> */}
                                            <SmartphoneIcon fontSize="large" />
                                            {/* <span className={kcClsx("kcLoginOTPListItemTitleClass")}>{otpCredential.userLabel}</span> */}
                                            <Typography  sx={{ fontSize: 12 }}>
                                                {otpCredential.userLabel}
                                            </Typography>
                                        </span>
                                    </label>
                                    <div style={{margin: 3}}></div>
                                </div>
                            </Fragment>
                        ))}
                        <div className={kcClsx("kcFormGroupClass")}>
                            {/* <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                <input
                                    id="kc-otp-reset-form-submit"
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    type="submit"
                                    value={msgStr("doSubmit")}
                                />
                            </div> */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                //disabled={isLoginButtonDisabled}
                                sx={{
                                marginTop: "20px",
                                backgroundColor: "#802b86",
                                "&:hover": {
                                    backgroundColor: "#5c1f62",
                                },
                                }}
                            >
                                {msgStr("doSubmit")}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
