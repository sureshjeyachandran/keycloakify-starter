import { useEffect } from "react";
//import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Alert, Box, Grid, Link, Paper, Typography } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

const renderIcon = (messageType: string) => {
    switch (messageType) {
      case "success":
        return <DoneAllIcon />;
      case "warning":
        return <WarningIcon />;
      case "error":
        return <ErrorIcon />;
      case "info":
        return <InfoIcon />;
      default:
        return null;
    }
  };

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        //displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const {  auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f7f7f7",
          }}
        >
          <Grid
            container
            sx={{
              width: 800,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "white",
            }}
          >
            {/* Left Section */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                backgroundColor: "#802b86",
                color: "white",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Welcome
              </Typography>
              <Typography variant="body1" gutterBottom>
                Join Our Unique Platform, Explore a New Experience
              </Typography>
              {/* <Button
                href={url.registrationUrl}
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "white",
                  color: "#802b86",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#d4a6dc",
                    color: "white",
                  },
                }}
              >
                Register
              </Button> */}
            </Grid>
    
            {/* Right Section */}
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >

                {/* <div className={kcClsx("kcLoginClass")} > */}
                <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "100%",
                        marginBottom: "16px",
                }}>
                    {/* <div>
                        
                        {(() => {
                            const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials ) ? (
                                
                                <Typography variant="h5" sx={{ marginBottom: "0px" }}>
                                    {headerNode}
                                </Typography>
                            ) : (
                                <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                        <div className="kc-login-tooltip">
                                            <i className={kcClsx("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            );
                            return node;
                        })()}
                    </div> */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%",
                            marginBottom: "16px",
                        }}
                        >
                        {(() => {
                            const node =
                            !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                                <Typography variant="h5" sx={{ marginTop: "40px" }}>
                                    {headerNode}
                                </Typography>
                            ) : (
                                <Box
                                id="kc-username"
                                className={kcClsx("kcFormGroupClass")}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                    <Typography id="kc-attempted-username" variant="body1">
                                        {auth?.attemptedUsername}
                                    </Typography>
                                    <Link
                                        id="reset-login"
                                        href={url.loginRestartFlowUrl}
                                        aria-label={msgStr("restartLoginTooltip")}
                                        sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
                                    >
                                        <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                        }}
                                        >
                                            <i className={kcClsx("kcResetFlowIcon")}></i>
                                            <Typography variant="body2" sx={{ color: "inherit" }}>
                                                {msg("restartLoginTooltip")}
                                            </Typography>
                                        </Box>
                                    </Link>
                                </Box>
                            );
                            return node;
                        })()}
                    </Box>
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                
                                <Alert
                                    severity={message.type}
                                    icon={renderIcon(message.type)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 2,
                                        bgcolor:
                                        message.type === "error"
                                            ? "#fdecea"
                                            : message.type === "success"
                                            ? "#edf7ed"
                                            : message.type === "warning"
                                            ? "#fff4e5"
                                            : "#e7f3fe",
                                    }}
                                >
                                    {/* <AlertTitle sx={{ textTransform: "capitalize" }}>{message.type}</AlertTitle> */}
                                    <Typography
                                        variant="body2"
                                        sx={{
                                        color: message.type === "error" ? "#d32f2f" : "inherit",
                                        textAlign: "left", // Ensures text aligns to the left
                                        direction: "ltr",  // Ensures the text direction is left-to-right
                                        
                                        }}
                                    >
                                        {kcSanitize(message.summary)}
                                    </Typography>
                                </Alert>
                            )}
                            {children}
                            {auth !== undefined && auth.showTryAnotherWayLink && (
                                <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        <input type="hidden" name="tryAnotherWay" value="on" />
                                        <a
                                            href="#"
                                            id="try-another-way"
                                            onClick={() => {
                                                document.forms["kc-select-try-another-way-form" as never].submit();
                                                return false;
                                            }}
                                        >
                                            {msg("doTryAnotherWay")}
                                        </a>
                                    </div>
                                </form>
                            )}
                            {socialProvidersNode}
                            {/* {displayInfo && (
                                <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                                    <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                        {infoNode}
                                    </div>
                                </div>
                            )} */}
                            {displayInfo && infoNode && (
                                <Box
                                    id="kc-info"
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        //width: "100%",
                                        //marginLeft: "16px",
                                        padding: "40px",
                                    }}
                                    >
                                    <Paper
                                        id="kc-info-wrapper"
                                        elevation={3}
                                        sx={{
                                        padding: "16px",
                                        backgroundColor: "#f5f5f5",
                                        borderRadius: 2,
                                        maxWidth: "600px",
                                        width: "100%",
                                        }}
                                    >
                                        <Typography variant="body1" color="textPrimary" sx={{
                                            textAlign: "left", // Ensures text aligns to the left
                                            direction: "ltr",  // Ensures the text direction is left-to-right
                                        }}>
                                            {infoNode}
                                        </Typography>
                                    </Paper>
                                </Box>
                            )}
                        </div>
                    </div>
                </Box>
                {/* </div> */}

            </Grid>
          </Grid>
        </Box>
      );

/*     return (
        <div className={kcClsx("kcLoginClass")}>
            <div id="kc-header" className={kcClsx("kcHeaderClass")}>
                <div id="kc-header-wrapper" className={kcClsx("kcHeaderWrapperClass")}>
                    {msg("loginTitleHtml", realm.displayNameHtml)}
                </div>
            </div>
            <div className={kcClsx("kcFormCardClass")}>
                <header className={kcClsx("kcFormHeaderClass")}>
                    {enabledLanguages.length > 1 && (
                        <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
                            <div id="kc-locale-wrapper" className={kcClsx("kcLocaleWrapperClass")}>
                                <div id="kc-locale-dropdown" className={clsx("menu-button-links", kcClsx("kcLocaleDropDownClass"))}>
                                    <button
                                        tabIndex={1}
                                        id="kc-current-locale-link"
                                        aria-label={msgStr("languages")}
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                        aria-controls="language-switch1"
                                    >
                                        {currentLanguage.label}
                                    </button>
                                    <ul
                                        role="menu"
                                        tabIndex={-1}
                                        aria-labelledby="kc-current-locale-link"
                                        aria-activedescendant=""
                                        id="language-switch1"
                                        className={kcClsx("kcLocaleListClass")}
                                    >
                                        {enabledLanguages.map(({ languageTag, label, href }, i) => (
                                            <li key={languageTag} className={kcClsx("kcLocaleListItemClass")} role="none">
                                                <a role="menuitem" id={`language-${i + 1}`} className={kcClsx("kcLocaleItemClass")} href={href}>
                                                    {label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                    {(() => {
                        const node = !(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                            <h1 id="kc-page-title">{headerNode}</h1>
                        ) : (
                            <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
                                <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                                <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                                    <div className="kc-login-tooltip">
                                        <i className={kcClsx("kcResetFlowIcon")}></i>
                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        );

                        if (displayRequiredFields) {
                            return (
                                <div className={kcClsx("kcContentWrapperClass")}>
                                    <div className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}>
                                        <span className="subtitle">
                                            <span className="required">*</span>
                                            {msg("requiredFields")}
                                        </span>
                                    </div>
                                    <div className="col-md-10">{node}</div>
                                </div>
                            );
                        }

                        return node;
                    })()}
                </header>
                <div id="kc-content">
                    <div id="kc-content-wrapper">
                        
                        {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={clsx(
                                    `alert-${message.type}`,
                                    kcClsx("kcAlertClass"),
                                    `pf-m-${message?.type === "error" ? "danger" : message.type}`
                                )}
                            >
                                <div className="pf-c-alert__icon">
                                    {message.type === "success" && <span className={kcClsx("kcFeedbackSuccessIcon")}></span>}
                                    {message.type === "warning" && <span className={kcClsx("kcFeedbackWarningIcon")}></span>}
                                    {message.type === "error" && <span className={kcClsx("kcFeedbackErrorIcon")}></span>}
                                    {message.type === "info" && <span className={kcClsx("kcFeedbackInfoIcon")}></span>}
                                </div>
                                <span
                                    className={kcClsx("kcAlertTitleClass")}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            </div>
                        )}
                        {children}
                        {auth !== undefined && auth.showTryAnotherWayLink && (
                            <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as never].submit();
                                            return false;
                                        }}
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </div>
                            </form>
                        )}
                        {socialProvidersNode}
                        {displayInfo && (
                            <div id="kc-info" className={kcClsx("kcSignUpClass")}>
                                <div id="kc-info-wrapper" className={kcClsx("kcInfoAreaWrapperClass")}>
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ); */
}
