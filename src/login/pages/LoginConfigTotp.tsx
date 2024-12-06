import { getKcClsx, KcClsx } from "keycloakify/login/lib/kcClsx";
//import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Box, Button, Checkbox, FormControlLabel, Link, TextField, Typography } from "@mui/material";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, { pageId: "login-config-totp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction, totp, mode, messagesPerField } = kcContext;

    const { msg, msgStr, advancedMsg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("loginTotpTitle")}
            displayMessage={!messagesPerField.existsError("totp", "userLabel")}
        >
            <Box sx={{                                       
                textAlign: "left", // Ensures text aligns to the left
                direction: "ltr",  // Ensures the text direction is left-to-right
            }}>
{/*                 <ol id="kc-totp-settings">
                    <li>
                        <p>{msg("loginTotpStep1")}</p>

                        <ul id="kc-totp-supported-apps">
                            {totp.supportedApplications.map(app => (
                                <li key={app}>{advancedMsg(app)}</li>
                            ))}
                        </ul>
                    </li>

                    {mode == "manual" ? (
                        <>
                            <li>
                                <p>{msg("loginTotpManualStep2")}</p>
                                <p>
                                    <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                </p>
                                <p>
                                    <a href={totp.qrUrl} id="mode-barcode">
                                        {msg("loginTotpScanBarcode")}
                                    </a>
                                </p>
                            </li>
                            <li>
                                <p>{msg("loginTotpManualStep3")}</p>
                                <ul>
                                    <li id="kc-totp-type">
                                        {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                    </li>
                                    <li id="kc-totp-algorithm">
                                        {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                    </li>
                                    <li id="kc-totp-digits">
                                        {msg("loginTotpDigits")}: {totp.policy.digits}
                                    </li>
                                    {totp.policy.type === "totp" ? (
                                        <li id="kc-totp-period">
                                            {msg("loginTotpInterval")}: {totp.policy.period}
                                        </li>
                                    ) : (
                                        <li id="kc-totp-counter">
                                            {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        </>
                    ) : (
                        <li>
                            <p>{msg("loginTotpStep2")}</p>
                            <img id="kc-totp-secret-qr-code" src={`data:image/png;base64, ${totp.totpSecretQrCode}`} alt="Figure: Barcode" />
                            <br />
                            <p>
                                <a href={totp.manualUrl} id="mode-manual">
                                    {msg("loginTotpUnableToScan")}
                                </a>
                            </p>
                        </li>
                    )}
                    <li>
                        <p>{msg("loginTotpStep3")}</p>
                        <p>{msg("loginTotpStep3DeviceName")}</p>
                    </li>
                </ol> */}
                    
                {/* Step 1: Install an Application */}
                <Typography variant="subtitle1" gutterBottom>
                    
                    1. {msg("loginTotpStep1")}
                </Typography>
                {/* <List>
                    {totp.supportedApplications.map(app => (       
                        <ListItem key={app}>
                            <ListItemText primary={advancedMsg(app)} />
                        </ListItem>
                    ))}
                </List> */}
                {totp.supportedApplications.map(app => (       
                    <Typography key={app} variant="subtitle1" gutterBottom sx={{marginLeft: 2, fontWeight: 'bold'}}>
                        {advancedMsg(app)}
                    </Typography>
                ))}
                
                {mode == "manual" ? (
                    <Box>
                        
                            {/* <p>{msg("loginTotpManualStep2")}</p> */}
                            <Typography variant="subtitle1" gutterBottom>
                                2. {msg("loginTotpManualStep2")}
                            </Typography>
                            {/* <p>
                                <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                            </p> */}
                            <Typography  sx={{ fontWeight: 'bold',fontSize: 16, margin:1 }}>
                                {totp.totpSecretEncoded}
                            </Typography>
                            {/* <p>
                                <a href={totp.qrUrl} id="mode-barcode">
                                    {msg("loginTotpScanBarcode")}
                                </a>
                            </p> */}
                            <Link href={totp.qrUrl} underline="hover" sx={{margin: 1, fontSize: 15}}>
                                {msg("loginTotpScanBarcode")}
                            </Link>
                        
                        
                            {/* <p>{msg("loginTotpManualStep3")}</p> */}
                            <Typography variant="subtitle1" gutterBottom>
                                3. {msg("loginTotpManualStep3")}
                            </Typography>
                            <ul>
                                {/* <li id="kc-totp-type">
                                    {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                </li> */}
                                <Typography variant="subtitle1" gutterBottom sx={{marginLeft: 1, fontWeight: 'bold', fontSize: 15}}>
                                    {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                </Typography>
                                {/* <li id="kc-totp-algorithm">
                                    {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                </li> */}
                                <Typography variant="subtitle1" gutterBottom sx={{marginLeft: 1, fontWeight: 'bold', fontSize: 15}}>
                                    {msg("loginTotpAlgorithm")}: {totp.policy.getAlgorithmKey()}
                                </Typography>
                                {/* <li id="kc-totp-digits">
                                    {msg("loginTotpDigits")}: {totp.policy.digits}
                                </li> */}
                                <Typography variant="subtitle1" gutterBottom sx={{marginLeft: 1, fontWeight: 'bold', fontSize: 15}}>
                                    {msg("loginTotpDigits")}: {totp.policy.digits}
                                </Typography>
                                {totp.policy.type === "totp" ? (
                                    <Typography variant="subtitle1" gutterBottom sx={{marginLeft: 1, fontWeight: 'bold', fontSize: 15}}>
                                        {msg("loginTotpInterval")}: {totp.policy.period}
                                    </Typography>
                                ) : (
                                    <Typography variant="subtitle1" gutterBottom sx={{marginLeft: 1, fontWeight: 'bold', fontSize: 15}}>
                                        {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                    </Typography>
                                )}
                            </ul>
                        
                    </Box>
                ) : (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom>
                            2. {msg("loginTotpStep2")}
                        </Typography>
                        {/* QR Code Image */}
                        <Box
                            component="img"
                            id="kc-totp-secret-qr-code"
                            src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                            alt="Barcode"
                            sx={{ display: "block", margin: "1px 0", maxWidth: "300px" }}
                        />

                        {/* Link for Manual Mode */}
                        <Typography variant="body1" sx={{marginLeft: 1.5}}>
                            <Link href={totp.manualUrl} id="mode-manual" underline="hover">
                            {msg("loginTotpUnableToScan")}
                            </Link>
                        </Typography>
                    </Box>
                )}

                <Typography variant="subtitle1" gutterBottom>
                    {(mode == "manual"? "4. " : "3. ")}{msg("loginTotpStep3")}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {msg("loginTotpStep3DeviceName")}
                </Typography>


                <form action={url.loginAction} className={kcClsx("kcFormClass")} id="kc-totp-settings-form" method="post">
{/*                     <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <label htmlFor="totp" className={kcClsx("kcLabelClass")}>
                                {msg("authenticatorCode")}
                            </label>{" "}
                            <span className="required">*</span>
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <input
                                type="text"
                                id="totp"
                                name="totp"
                                autoComplete="off"
                                className={kcClsx("kcInputClass")}
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
                        </div>
                        <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                        {mode && <input type="hidden" id="mode" value={mode} />}
                    </div> */}
                    <TextField
                        id="totp"
                        name="totp"
                        //defaultValue={login.username ?? ""}
                        //label="Email"
                        label={msg("authenticatorCode")}
                        type="text"
                        fullWidth
                        required
                        margin="normal"
                        error={messagesPerField.existsError("totp")}
                        helperText={messagesPerField.get("totp")}
                        sx={{marginTop: 0}}
                    />

{/*                     <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <label htmlFor="userLabel" className={kcClsx("kcLabelClass")}>
                                {msg("loginTotpDeviceName")}
                            </label>{" "}
                            {totp.otpCredentials.length >= 1 && <span className="required">*</span>}
                        </div>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <input
                                type="text"
                                id="userLabel"
                                name="userLabel"
                                autoComplete="off"
                                className={kcClsx("kcInputClass")}
                                aria-invalid={messagesPerField.existsError("userLabel")}
                            />
                            {messagesPerField.existsError("userLabel") && (
                                <span
                                    id="input-error-otp-label"
                                    className={kcClsx("kcInputErrorMessageClass")}
                                    aria-live="polite"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.get("userLabel"))
                                    }}
                                />
                            )}
                        </div>
                    </div> */}

                    <TextField
                        id="userLabel"
                        name="userLabel"
                        //defaultValue={login.username ?? ""}
                        //label="Email"
                        label={msg("loginTotpDeviceName")}
                        type="text"
                        fullWidth
                        required
                        margin="normal"
                        error={messagesPerField.existsError("userLabel")}
                        helperText={messagesPerField.get("userLabel")}
                    />

                    {/* <div className={kcClsx("kcFormGroupClass")}> */}
                        <LogoutOtherSessions kcClsx={kcClsx} i18n={i18n} />
                    {/* </div> */}

                    {isAppInitiatedAction ? (
                        <>
{/*                             <input
                                type="submit"
                                className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                                id="saveTOTPBtn"
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
 {/*                            <button
                                type="submit"
                                className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass", "kcButtonLargeClass")}
                                id="cancelTOTPBtn"
                                name="cancel-aia"
                                value="true"
                            >
                                {msg("doCancel")}
                            </button> */}
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
                                {msg("doCancel")}
                            </Button>
                        </>
                    ) : (
 /*                     <input
                            type="submit"
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                            id="saveTOTPBtn"
                            value={msgStr("doSubmit")}
                        /> */
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
                    )}
                </form>
            </Box>
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
