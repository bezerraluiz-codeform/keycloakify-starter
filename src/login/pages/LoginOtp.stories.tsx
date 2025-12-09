import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-otp.ftl" });

const meta = {
    title: "login/login-otp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (fieldName: string) => fieldName === "otp",
                    get: (fieldName: string) => (fieldName === "otp" ? "Invalid code." : undefined)
                }
            }}
        />
    )
};

export const WithAlternativeAuthenticator: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                otpLogin: {
                    userOtpCredentials: [
                        {
                            id: "1",
                            userLabel: "E-mail"
                        },
                        {
                            id: "2",
                            userLabel: "Telefone"
                        }
                    ]
                }
            }}
        />
    )
};
