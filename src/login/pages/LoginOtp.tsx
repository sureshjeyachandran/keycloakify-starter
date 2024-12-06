import { Fragment } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
//import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
//import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Box, Button, TextField, Typography } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { otpLogin, url, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

/*     interface LabelCardProps {
        label: string;
    }
      
    const LabelCard: React.FC<LabelCardProps> = ({ label }) => {
        return (
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 150,
              height: 100,
              borderRadius: 2,
              boxShadow: 3,
              margin: "10px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SmartphoneIcon sx={{ fontSize: 30, color: "#3f51b5", marginBottom: "5px" }} />
              <Typography variant="body1" color="textPrimary">
                {label}
              </Typography>
            </CardContent>
          </Card>
        );
    }; */


    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("totp")}
            headerNode={msg("doLogIn")}
        >
            <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                {otpLogin.userOtpCredentials.length > 1 && (
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            {otpLogin.userOtpCredentials.map((otpCredential, index) => (
                                <Fragment key={index}>
                                    
                                    {/* <IconButton name="selectedCredentialId" id={`kc-otp-credential-${index}`} aria-label="delete" disabled={otpCredential.id !== otpLogin.selectedCredentialId} color="primary">
                                        <SmartphoneIcon fontSize="large" />
                                        <Typography>
                                            {otpCredential.userLabel}
                                        </Typography>
                                    </IconButton> */}
                                    <div style={{margin: 5, display: "inline-flex"}}>
                                        <input
                                            id={`kc-otp-credential-${index}`}
                                            className={kcClsx("kcLoginOTPListInputClass")}
                                            type="radio"
                                            name="selectedCredentialId"
                                            value={otpCredential.id}
                                            defaultChecked={otpCredential.id === otpLogin.selectedCredentialId}
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
                        </div>
                    </div>
                )}

                <Box sx={{padding: 2}}>
                    <div className={kcClsx("kcFormGroupClass")}>
    {/*                     <div className={kcClsx("kcLabelWrapperClass")}>
                            <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                                {msg("loginOtpOneTime")}
                            </label>
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <input
                                id="otp"
                                name="otp"
                                autoComplete="off"
                                type="text"
                                className={kcClsx("kcInputClass")}
                                autoFocus
                                aria-invalid={messagesPerField.existsError("totp")}
                            />
                            {messagesPerField.existsError("totp") && (
                                <span
                                    id="input-error-otp-code"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("totp"))
                                    }}
                                />
                            )}
                        </div> */}
                        <TextField
                            id="otp"
                            name="otp"
                            
                            //defaultValue={login.username ?? ""}
                            //label="Email"
                            label={msg("loginOtpOneTime")}
                            type="text"
                            fullWidth
                            required
                            margin="normal"
                            error={messagesPerField.existsError("totp")}
                            helperText={messagesPerField.get("totp")}
                        />
                    </div>

                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                        </div>
                        {/* <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                            <input
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
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
                            {msgStr("doLogIn")}
                        </Button>
                    </div>
                </Box>
            </form>
        </Template>
    );
}
