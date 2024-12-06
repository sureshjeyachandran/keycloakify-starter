//import { getKcClsx } from "keycloakify/login/lib/kcClsx";
//import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { TextField,Button,Link, Box } from "@mui/material";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

/*     const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    }); */

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" /* className={kcClsx("kcFormClass")} */ action={url.loginAction} method="post">
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    mt: 2,
                }}>
                    {/* <div className={kcClsx("kcFormGroupClass")}> */}
                        <TextField
                            id="username"
                            name="username"
                            defaultValue={auth.attemptedUsername ?? ""}
                            //label="Email"
                            label={!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                ? msg("usernameOrEmail")
                                : msg("email")}
                            type="text"
                            fullWidth
                            required
                            margin="normal"
                            error={messagesPerField.existsError("username")}
                            helperText={messagesPerField.getFirstError("username", "password")}
                        />
                    {/* </div> */}
                    {/* <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}> */}
                        <Box sx={{
                            display: "flex",
                            width: "100%",
                        }}>
                            <Link href={url.loginUrl} underline="hover">
                                {msg("backToLogin")}
                            </Link>
                        </Box>
                        
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            //disabled={isLoginButtonDisabled}
                            sx={{
                            marginTop: "10px",
                            //marginBottom: "-100px",
                            backgroundColor: "#802b86",
                            "&:hover": {
                                backgroundColor: "#5c1f62",
                            },
                            }}
                        >
                            {msgStr("doSubmit")}
                        </Button>
                    {/* </div> */}
                </Box>
            </form>
        </Template>
    );
}
