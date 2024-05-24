import { Container } from "reactstrap";
import AppNav from "../../../components/Navbar";

export default function Page() {
    return (
        <>
            <AppNav hideSideNav={true} />
            <Container className="mt-4">
                <h5 style={{ color: "#68069d" }} className="mb-4">ZimbaCash SMS Policys</h5>
                <p>
                    <span style={{ fontWeight: "bold" }}>TEXT MESSAGING:</span> When accepting the text messaging
                    agreement, you authorize ZimbaCash, our assigns, successors, or
                    servicing agents to send SMS Statement Notifications (as defined
                    below) to any phone numbers provided to us, our assigns,
                    successors, or service agents in connection with this loan and any
                    modification or renewal of this loan. As used in this text-messaging
                    disclosure, &ldquo;SMS Statement Notifications&rdquo; means any SMS (text
                    message) communications from us to you pertaining to your loan
                    sent to the phone numbers provided in connection with this loan,
                    including but not limited to payment information, loan approvals,
                    account information, due dates, delinquent accounts, and program
                    updates.
                </p>
                <ol>
                    <li>
                        How to Unsubscribe: You may withdraw your consent to receive
                        SMS Statement Notifications by replying with &ldquo;stop&rdquo; or emailing
                        us at <span style={{ color: "#68069d" }}>partners@zimbacash.com</span>. We may treat your provision of
                        an invalid mobile phone number or the subsequent malfunction
                        of a previously valid mobile phone number as a withdrawal of
                        your consent to receive SMS Statement Notifications. Any
                        withdrawal of your consent to use SMS Statement Notifications
                        will be effective only after we have a reasonable period of time
                        to process your withdrawal.
                    </li>
                    <li>
                        To request additional information, contact us by email at
                        <span style={{ color: "#68069d" }}> partners@zimbacash.com</span>.
                    </li>
                    <li>
                        In order to access, view, and retain SMS Statement
                        Notifications that we make available to you, you must have (i) a
                        SMS-capable mobile phone, (ii) an active mobile phone account with a communication service provider; and (iii) sufficient
                        storage capacity on your mobile phone.
                    </li>
                    <li>
                        All SMS Statement Notifications in electronic format from us to
                        you will be considered &ldquo;in writing.&rdquo;
                    </li>
                    <li>
                        There is no service fee for SMS Statement Notifications, but you
                        are responsible for any and all charges, including but not limited
                        to fees associated with text messaging, imposed by your
                        communications service provider. Other charges may apply.
                        Such charges may include those from your communications
                        service provider. Please consult your mobile service carrier&rsquo;s
                        pricing plan to determine the charges for sending and receiving
                        text messages. These charges will appear on your phone bill.
                        Message frequency depends on account settings.
                    </li>
                    <li>
                        Additionally, you agree that we may send any SMS Statement
                        Notifications through your communication service provider in
                        order to deliver them to you and that your communication
                        services provider is acting as your agent in this capacity. You
                        agree to provide a valid mobile phone number for these
                        services so that we may send you certain information about
                        your loan. Additionally, you agree to indemnify, defend and hold
                        us harmless from and against any and all claims, losses,
                        liability, cost, and expenses (including reasonable attorneys
                        fees) arising from your provision of a mobile phone number that
                        is not your own or your violation of applicable federal, state or
                        local law, regulation or ordinance. Your obligation under this
                        paragraph shall survive termination of this Agreement. SMS
                        Statement Notifications are provided for your convenience only
                    </li>
                    <li>
                        Receipt of each SMS Statement may be delayed or impacted by
                        factor(s) pertaining to your communications service provider(s).
                        We will not be liable for losses or damages arising from any disclosure of account information to third parties, non-delivery,
                        delayed delivery, misdirected delivery or mishandling of, or
                        inaccurate content in the SMS Statement Notifications sent by
                        us.
                    </li>
                </ol>
                <p>
                    We may modify or terminate our text messaging services from time
                    to time, for any reason, and without notice, including the right to
                    terminate text messaging with or without notice, without liability to
                    you, any other user, or third party.
                </p>
                <h6 style={{ fontWeight: "bold" }} className="my-3">Frequently Asked Questions</h6>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>What is a text message?</span> A Text message is a short message that
                    can be sent to and from a cellular phone. When someone says text,
                    texting, or SMS, or if you see TXT in print, all of these are referring to
                    text messages.
                </p>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>What is SMS?</span> SMS is an acronym for Short Message Service. It is a
                    worldwide standard for communicating textually between cellular
                    phones.
                </p>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>Can everyone receive text messages?</span> Nearly every cellular phone
                    in use in the United States (and the world) can receive text
                    messages. Most wireless carriers include text messaging in their
                    standard plans
                </p>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>How can I opt-in to receiving text messages?</span> By consenting to
                    and accepting the &ldquo;Text Messaging Terms and Conditions.&rdquo;
                </p>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}> What kind of text messages will I receive?</span> You will receive
                    messages for any lawful purpose, including but not limited to: (1)
                    suspected fraud or identity theft; (2) obtaining information necessary for us to service your account; (3) collecting on your account; (4)
                    notifying you as to important issues regarding your account.
                </p>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}>How frequently will I receive text messages? </span>As warranted by our
                    transaction/relationship with you.
                </p>
                <p className="mb-2">
                    <span style={{ fontWeight: "bold" }}> What does it cost for me to receive a text message?</span> Some phone
                    carriers do not charge their customers to receive text messages.
                    Others include a certain number in their standard plans. You will pay
                    any fee or charge that you may incur for incoming and outgoing
                    messages from or to us, without reimbursement from us. The fee
                    incurred will depend on the arrangement you have with your mobile
                    phone provider. Please check with your wireless carrier for cost.
                </p>
                <p className="mb-2">
                    <strong> How can I opt-out from receiving text messages?</strong> To opt-out, you
                    can reply with the word &ldquo;STOP&rdquo; or email us at
                    <span style={{ color: "#68069d" }}> partners@zimbacash.com</span>.
                </p>
                <p style={{marginBottom:"90px"}}>
                    <strong> What other ways can I receive support for text messaging?</strong> You
                    can also receive support by sending an email to
                    <span style={{ color: "#68069d" }}> partners@zimbacash.com</span>.
                </p>
            </Container>
        </>
    )
}