import { useState } from "react";
//import { useEffect, useReducer, useState } from "react";
//import { kcSanitize } from "keycloakify/lib/kcSanitize";
//import { assert } from "keycloakify/tools/assert";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Typography,
  } from "@mui/material";
  import Visibility from '@mui/icons-material/Visibility';
  import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("password", "password-confirm")}
            headerNode={msg("updatePasswordTitle")}
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    {/* <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="password-new" className={kcClsx("kcLabelClass")}>
                            {msg("passwordNew")}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                            <input
                                type="password"
                                id="password-new"
                                name="password-new"
                                className={kcClsx("kcInputClass")}
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password") && (
                            <span
                                id="input-error-password"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password"))
                                }}
                            />
                        )}
                    </div> */}
                    <FormControl sx={{ marginTop: 1 }} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{msg("passwordNew")}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showNewPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showNewPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="password-new"
                            name="password-new"
                            error={messagesPerField.existsError("password", "password-confirm")}
                        />
                        {messagesPerField.existsError("password") && (
                            <Typography sx={{ marginBottom: "10px" , color: "#d32f2f"}}>
                                {messagesPerField.get("password")}
                            </Typography>
                        )}
                    </FormControl>
                </div>

                <div className={kcClsx("kcFormGroupClass")}>
                    {/* <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="password-confirm" className={kcClsx("kcLabelClass")}>
                            {msg("passwordConfirm")}
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-confirm">
                            <input
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                className={kcClsx("kcInputClass")}
                                autoFocus
                                autoComplete="new-password"
                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                            />
                        </PasswordWrapper>

                        {messagesPerField.existsError("password-confirm") && (
                            <span
                                id="input-error-password-confirm"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("password-confirm"))
                                }}
                            />
                        )}
                    </div> */}
                    <FormControl sx={{ marginTop: 1 }} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{msg("passwordConfirm")}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showConfirmPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="password-confirm"
                            name="password-confirm"
                            error={messagesPerField.existsError("password", "password-confirm")}
                        />
                        {messagesPerField.existsError("password-confirm") && (
                            <Typography sx={{ marginBottom: "10px" , color: "#d32f2f"}}>
                                {messagesPerField.get("password-confirm")}
                            </Typography>
                        )}
                    </FormControl>
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    {/* <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}> */}
                        {/* <input
                            className={kcClsx(
                                "kcButtonClass",
                                "kcButtonPrimaryClass",
                                !isAppInitiatedAction && "kcButtonBlockClass",
                                "kcButtonLargeClass"
                            )}
                            type="submit"
                            value={msgStr("doSubmit")}
                        /> */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
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
                        {isAppInitiatedAction && (
                            <>
{/*                             <button
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                type="submit"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button> */}
                            <Button
                                name="cancel-aia"
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                marginTop: "20px",
                                backgroundColor: "#802b86",
                                "&:hover": {
                                    backgroundColor: "#5c1f62",
                                },
                                }}
                            >
                                {msg("doCancel")}
                            </Button>
                            </>
                        )}
                    {/* </div> */}
                </div>
            </form>
        </Template>
    );
}

function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
    //const { kcClsx, i18n } = props;

    const { i18n } = props;

    const { msg } = i18n;

    return (
/*         <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
                        {msg("logoutOtherSessions")}
                    </label>
                </div>
            </div> 
        </div> */
        <FormControlLabel
        control={<Checkbox name="logout-sessions" defaultChecked={true} />}
        label={msg("logoutOtherSessions")}
        />
    );
}

/* function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
            </button>
        </div>
    );
} */
