import { Suspense, lazy } from "react";
import type { ComponentProps } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginOtp from "./pages/LoginOtp";
import "./index.css";
import "./login.css";
import "./register.css";
import "./otp.css";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const UserProfileFormFieldsTwoColumns = (props: ComponentProps<typeof UserProfileFormFields>) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserProfileFormFields {...props} />
        </div>
    );
};

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                { ...{ kcContext, i18n, classes, Template, doUseDefaultCss: true } }
                            />
                        );
                    case "register.ftl":
                        return (
                            <div className="register-page-custom-wrapper">
                                <Register
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFieldsTwoColumns}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            </div>
                        );
                    case "login-otp.ftl":
                        return (
                            <LoginOtp
                                { ...{ kcContext, i18n, classes, Template, doUseDefaultCss: true } }
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
