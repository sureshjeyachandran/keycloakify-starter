import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Typography } from "@mui/material";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo
            headerNode={msg("emailVerifyTitle")}
            infoNode={
                <p className="instruction">
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a href={url.loginAction}>{msg("doClickHere")}</a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            }
        >
            {/* <p className="instruction">{msg("emailVerifyInstruction1", user?.email ?? "")}</p> */}
            <Typography sx={{ marginBottom: "10px", 
                textAlign: "left", // Ensures text aligns to the left
                direction: "ltr",  // Ensures the text direction is left-to-right
                marginLeft: "16px",
            }}>
                {msg("emailVerifyInstruction1", user?.email ?? "")}
            </Typography>
        </Template>
    );
}
