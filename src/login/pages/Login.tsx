import { useState } from "react";
//import { useState, useEffect, useReducer } from "react";
//import { kcSanitize } from "keycloakify/lib/kcSanitize";
//import { assert } from "keycloakify/tools/assert";
//import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
//import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Link,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
  } from "@mui/material";
  import Visibility from '@mui/icons-material/Visibility';
  import VisibilityOff from '@mui/icons-material/VisibilityOff';
  

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg,msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

/*     const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n; */

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            /* infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            } */
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <>
                                    {/* <div className={kcClsx("kcFormGroupClass")}>
                                        <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                            {!realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                ? msg("usernameOrEmail")
                                                : msg("email")}
                                        </label>
                                        <input
                                            tabIndex={2}
                                            id="username"
                                            className={kcClsx("kcInputClass")}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                        />
                                        {messagesPerField.existsError("username", "password") && (
                                            <span
                                                id="input-error"
                                                className={kcClsx("kcInputErrorMessageClass")}
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                }}
                                            />
                                        )}
                                    </div> */}
                                    {messagesPerField.existsError("username", "password") &&
                                        <Typography sx={{ marginBottom: "10px" , color: "#d32f2f"}}>
                                            {messagesPerField.getFirstError("username", "password")}
                                        </Typography>
                                    }
                                    <TextField
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
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
                                        error={messagesPerField.existsError("username", "password")}
                                        //helperText={messagesPerField.getFirstError("username", "password")}
                                    />
                                </>

                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                {/* <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                    {msg("password")}
                                </label>
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <input
                                        tabIndex={3}
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    />
                                </PasswordWrapper>
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )} */}
                                {/* Password Field */}
                                {/* <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    required
                                    margin="normal"
                                    error={messagesPerField.existsError("username", "password")}
                                /> */}
                                <FormControl sx={{ marginTop: 1 }} fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">{msg("password")}</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Password"
                                        name="password"
                                        error={messagesPerField.existsError("username", "password")}
                                    />
                                </FormControl>
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                    {/* Remember Me and Forgot Password */}
                                    <Box
                                        sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "10px",
                                        }}
                                    >
                                        {realm.rememberMe && !usernameHidden && (
                                            <FormControlLabel
                                                control={<Checkbox name="rememberMe" />}
                                                label={msg("rememberMe")}
                                            />
                                        )}

                                        {realm.resetPasswordAllowed && (
                                            <Link href={url.loginResetCredentialsUrl} underline="hover" sx={{marginBottom: 1}}>
                                                {msg("doForgotPassword")}
                                            </Link>
                                        )}
                                    </Box>
{/*                                 <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                {msg("rememberMe")}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span>
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div> */}
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                {/* <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                /> */}

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={isLoginButtonDisabled}
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
                        </form>
                    )}
                </div>
            </div>
        </Template>
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
