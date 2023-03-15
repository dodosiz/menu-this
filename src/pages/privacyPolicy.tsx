import { Layout } from "@/components/commons/layout";
import { LoadingPage } from "@/components/commons/loadingPage";
import {
  Container,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Box,
  UnorderedList,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/privacyPolicy.module.css";
import { auth } from "@/lib/core/firebase";

export default function PrivacyPolicy() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setLoading(false);
    });
  });
  return (
    <Layout user={user}>
      <>
        {isLoading && <LoadingPage fullHeight={true} />}
        {!isLoading && (
          <Container maxW="6xl" className={styles.policy}>
            <Heading as="h2" size="lg">
              PRIVACY POLICY
            </Heading>
            <Box as="b">Last updated March 04, 2023</Box>
            <Box fontSize="md">
              {"This privacy notice for deinlog.com ('Website'," +
                "'we', 'us', or 'our'), describes how and why we might collect," +
                "store, use, and/or share ('process') your information when you use" +
                "our services ('Services'), such as when you:"}
              <UnorderedList>
                <ListItem>
                  Visit our website at{" "}
                  <Link as={NextLink} href="/">
                    http://www.deinlog.com/
                  </Link>
                  , or any website of ours that links to this privacy notice
                </ListItem>
                <ListItem>
                  Engage with us in other related ways, including any sales,
                  marketing, or events
                </ListItem>
              </UnorderedList>
            </Box>
            <Heading as="h3" size="md">
              SUMMARY OF KEY POINTS
            </Heading>
            <Box>
              This summary provides key points from our privacy notice, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our table of
              contents below to find the section you are looking for. You can
              also click{" "}
              <Link as={NextLink} href="#toc">
                here
              </Link>{" "}
              to go directly to our table of contents.
            </Box>
            <Box as="b">What personal information do we process?</Box>
            <Box>
              When you visit, use, or navigate our Services, we may process
              personal information depending on how you interact with
              deinlog.com and the Services, the choices you make, and the
              products and features you use.
            </Box>
            <Box as="b">Do we process any sensitive personal information?</Box>
            <Box>We do not process sensitive personal information.</Box>
            <Box as="b">Do we receive any information from third parties?</Box>
            <Box>We do not receive any information from third parties.</Box>
            <Box as="b">How do we process your information?</Box>
            <Box>
              We process your information to provide, improve, and administer
              our Services, communicate with you, for security and fraud
              prevention, and to comply with law. We may also process your
              information for other purposes with your consent. We process your
              information only when we have a valid legal reason to do so. Click{" "}
              <Link as={NextLink} href="#infouse">
                here
              </Link>{" "}
              to learn more.
            </Box>
            <Box as="b">
              In what situations and with which parties do we share personal
              information?
            </Box>
            <Box>
              We may share information in specific situations and with specific
              third parties. Click{" "}
              <Link as={NextLink} href="#whoshare">
                here
              </Link>{" "}
              to learn more.
            </Box>
            <Box as="b">How do we keep your information safe?</Box>
            <Box>
              We have organisational and technical processes and procedures in
              place to protect your personal information. However, no electronic
              transmission over the internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorised
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
              Click{" "}
              <Link as={NextLink} href="#infosafe">
                here
              </Link>{" "}
              to learn more.
            </Box>
            <Box as="b">What are your rights?</Box>
            <Box>
              Depending on where you are located geographically, the applicable
              privacy law may mean you have certain rights regarding your
              personal information. Click{" "}
              <Link as={NextLink} href="#privacyrights">
                here
              </Link>{" "}
              to learn more.
            </Box>
            <Box as="b">How do you exercise your rights?</Box>
            <Box>
              The easiest way to exercise your rights is by sending us an email
              at <strong>info@deinlog.com</strong>. We will consider and act
              upon any request in accordance with applicable data protection
              laws.
            </Box>
            <Box>
              Want to learn more about what deinlog.com does with any
              information we collect? Click{" "}
              <Link as={NextLink} href="#toc">
                here
              </Link>{" "}
              to review the notice in full.
            </Box>
            <Box id="toc">
              <OrderedList>
                <ListItem>
                  <Link as={NextLink} href="#infocollect">
                    WHAT INFORMATION DO WE COLLECT?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#infouse">
                    HOW DO WE PROCESS YOUR INFORMATION?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#legalbases">
                    WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
                    INFORMATION?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#whoshare">
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?{" "}
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#cookies">
                    DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#sociallogins">
                    HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#inforetain">
                    HOW LONG DO WE KEEP YOUR INFORMATION?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#infosafe">
                    HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#privacyrights">
                    WHAT ARE YOUR PRIVACY RIGHTS?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#DNT">
                    CONTROLS FOR DO-NOT-TRACK FEATURES
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#caresidents">
                    DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#virginia">
                    DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#policyupdates">
                    DO WE MAKE UPDATES TO THIS NOTICE?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#contact">
                    HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="#request">
                    HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                    FROM YOU?
                  </Link>
                </ListItem>
              </OrderedList>
            </Box>
            <Heading as="h3" size="md" id="infocollect">
              1. WHAT INFORMATION DO WE COLLECT?
            </Heading>
            <Box as="b">Personal information you disclose to us</Box>
            <Box>
              <Box as="i">
                <Box as="b">In Short:</Box> We collect personal information that
                you provide to us.
              </Box>
            </Box>
            <Box>
              We collect personal information that you voluntarily provide to us
              when you register on the Services, express an interest in
              obtaining information about us or our products and Services, when
              you participate in activities on the Services, or otherwise when
              you contact us.
            </Box>
            <Box>
              <Box as="b">Personal Information Provided by You.</Box> The
              personal information that we collect depends on the context of
              your interactions with us and the Services, the choices you make,
              and the products and features you use. The personal information we
              collect may include the following:
            </Box>
            <UnorderedList>
              <ListItem>passwords</ListItem>
              <ListItem>email addresses</ListItem>
            </UnorderedList>
            <Box>
              <Box as="b">Sensitive Information.</Box> We do not process
              sensitive information.
            </Box>
            <Box>
              <Box as="b">Social Media Login Data.</Box> We may provide you with
              the option to register with us using your existing social media
              account details, like your Facebook, Google, or other social media
              account. If you choose to register in this way, we will collect
              the information described in the section called{" "}
              <Link as={NextLink} href="#sociallogins">
                HOW DO WE HANDLE YOUR SOCIAL LOGINS?
              </Link>{" "}
              below.
            </Box>
            <Box>
              All personal information that you provide to us must be true,
              complete, and accurate, and you must notify us of any changes to
              such personal information.
            </Box>
            <Box as="b">Information automatically collected</Box>
            <Box>
              <Box as="i">
                <Box as="b">In Short:</Box> Some information — such as your
                Internet Protocol (IP) address and/or browser and device
                characteristics — is collected automatically when you visit our
                Services.
              </Box>
            </Box>
            <Box>
              We automatically collect certain information when you visit, use,
              or navigate the Services. This information does not reveal your
              specific identity (like your name or contact information) but may
              include device and usage information, such as your IP address,
              browser and device characteristics, operating system, language
              preferences, referring URLs, device name, country, location,
              information about how and when you use our Services, and other
              technical information. This information is primarily needed to
              maintain the security and operation of our Services, and for our
              internal analytics and reporting purposes.
            </Box>
            <Box>
              Like many businesses, we also collect information through cookies
              and similar technologies.
            </Box>
            <Box>The information we collect includes:</Box>
            <UnorderedList>
              <ListItem>
                Log and Usage Data. Log and usage data is service-related,
                diagnostic, usage, and performance information our servers
                automatically collect when you access or use our Services and
                which we record in log files. Depending on how you interact with
                us, this log data may include your IP address, device
                information, browser type, and settings and information about
                your activity in the Services (such as the date/time stamps
                associated with your usage, pages and files viewed, searches,
                and other actions you take such as which features you use),
                device event information (such as system activity, error reports
                (sometimes called crash dumps), and hardware settings).
              </ListItem>
            </UnorderedList>
            <Heading as="h3" size="md" id="infouse">
              2. HOW DO WE PROCESS YOUR INFORMATION?
            </Heading>
            <Box>
              <Box as="i">
                <Box as="b">In Short:</Box> We process your information to
                provide, improve, and administer our Services, communicate with
                you, for security and fraud prevention, and to comply with law.
                We may also process your information for other purposes with
                your consent.
              </Box>
              <Box>
                <Box as="b">
                  We process your personal information for a variety of reasons,
                  depending on how you interact with our Services, including:
                </Box>
              </Box>
              <UnorderedList>
                <ListItem>
                  To facilitate account creation and authentication and
                  otherwise manage user accounts. We may process your
                  information so you can create and log in to your account, as
                  well as keep your account in working order.
                </ListItem>
                <ListItem>
                  To request feedback. We may process your information when
                  necessary to request feedback and to contact you about your
                  use of our Services.
                </ListItem>
                <ListItem>
                  To protect our Services. We may process your information as
                  part of our efforts to keep our Services safe and secure,
                  including fraud monitoring and prevention.
                </ListItem>
                <ListItem>
                  To identify usage trends. We may process information about how
                  you use our Services to better understand how they are being
                  used so we can improve them.
                </ListItem>
                <ListItem>
                  To determine the effectiveness of our marketing and
                  promotional campaigns. We may process your information to
                  better understand how to provide marketing and promotional
                  campaigns that are most relevant to you.
                </ListItem>
                <ListItem>
                  To save or protect an individual vital interest. We may
                  process your information when necessary to save or protect an
                  individual vital interest, such as to prevent harm.
                </ListItem>
              </UnorderedList>
            </Box>
            <Heading as="h3" size="md" id="legalbases">
              3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?
            </Heading>
            <Box>
              <Box as="i">
                <Box as="b">In Short:</Box> We only process your personal
                information when we believe it is necessary and we have a valid
                legal reason (i.e. legal basis) to do so under applicable law,
                like with your consent, to comply with laws, to provide you with
                services to enter into or fulfil our contractual obligations, to
                protect your rights, or to fulfil our legitimate business
                interests.
              </Box>
              <Box>
                <Box as="b">
                  If you are located in the EU or UK, this section applies to
                  you.
                </Box>
              </Box>
              <Box>
                The General Data Protection Regulation (GDPR) and UK GDPR
                require us to explain the valid legal bases we rely on in order
                to process your personal information. As such, we may rely on
                the following legal bases to process your personal information:
              </Box>
              <UnorderedList>
                <ListItem>
                  Consent. We may process your information if you have given us
                  permission (i.e. consent) to use your personal information for
                  a specific purpose. You can withdraw your consent at any time.
                  Click{" "}
                  <Link as={NextLink} href="#withdrawconsent">
                    here
                  </Link>{" "}
                  to learn more.
                </ListItem>
                <ListItem>
                  Legitimate Interests. We may process your information when we
                  believe it is reasonably necessary to achieve our legitimate
                  business interests and those interests do not outweigh your
                  interests and fundamental rights and freedoms. For example, we
                  may process your personal information for some of the purposes
                  described in order to:
                  <UnorderedList>
                    <ListItem>
                      Analyse how our Services are used so we can improve them
                      to engage and retain users
                    </ListItem>
                    <ListItem>Support our marketing activities</ListItem>
                    <ListItem>
                      Diagnose problems and/or prevent fraudulent activities
                    </ListItem>
                    <ListItem>
                      Understand how our users use our products and services so
                      we can improve user experience
                    </ListItem>
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  Legal Obligations. We may process your information where we
                  believe it is necessary for compliance with our legal
                  obligations, such as to cooperate with a law enforcement body
                  or regulatory agency, exercise or defend our legal rights, or
                  disclose your information as evidence in litigation in which
                  we are involved.
                </ListItem>
                <ListItem>
                  Vital Interests. We may process your information where we
                  believe it is necessary to protect your vital interests or the
                  vital interests of a third party, such as situations involving
                  potential threats to the safety of any person.
                </ListItem>
              </UnorderedList>
              <Box as="b">
                If you are located in Canada, this section applies to you.
              </Box>
              <Box>
                We may process your information if you have given us specific
                permission (i.e. express consent) to use your personal
                information for a specific purpose, or in situations where your
                permission can be inferred (i.e. implied consent). You can
                withdraw your consent at any time. Click{" "}
                <Link as={NextLink} href="#withdrawconsent">
                  here
                </Link>{" "}
                to learn more.
              </Box>
              <Box>
                In some exceptional cases, we may be legally permitted under
                applicable law to process your information without your consent,
                including, for example:
              </Box>
              <UnorderedList>
                <ListItem>
                  If collection is clearly in the interests of an individual and
                  consent cannot be obtained in a timely way
                </ListItem>
                <ListItem>
                  For investigations and fraud detection and prevention
                </ListItem>
                <ListItem>
                  For business transactions provided certain conditions are met
                </ListItem>
                <ListItem>
                  If it is contained in a witness statement and the collection
                  is necessary to assess, process, or settle an insurance claim
                </ListItem>
                <ListItem>
                  For identifying injured, ill, or deceased persons and
                  communicating with next of kin
                </ListItem>
                <ListItem>
                  If we have reasonable grounds to believe an individual has
                  been, is, or may be victim of financial abuse
                </ListItem>
                <ListItem>
                  If it is reasonable to expect collection and use with consent
                  would compromise the availability or the accuracy of the
                  information and the collection is reasonable for purposes
                  related to investigating a breach of an agreement or a
                  contravention of the laws of Canada or a province
                </ListItem>
                <ListItem>
                  If disclosure is required to comply with a subpoena, warrant,
                  court order, or rules of the court relating to the production
                  of records
                </ListItem>
                <ListItem>
                  If it was produced by an individual in the course of their
                  employment, business, or profession and the collection is
                  consistent with the purposes for which the information was
                  produced
                </ListItem>
                <ListItem>
                  If the collection is solely for journalistic, artistic, or
                  literary purposes
                </ListItem>
                <ListItem>
                  If the information is publicly available and is specified by
                  the regulations
                </ListItem>
              </UnorderedList>
            </Box>
            <Heading as="h3" size="md" id="whoshare">
              4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> We may share information in specific
              situations described in this section and/or with the following
              third parties.
            </Box>
            <Box>
              We may need to share your personal information in the following
              situations:
            </Box>
            <UnorderedList>
              <ListItem>
                Business Transfers. We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of
                company assets, financing, or acquisition of all or a portion of
                our business to another company.
              </ListItem>
            </UnorderedList>
            <Heading as="h3" size="md" id="cookies">
              5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> We may use cookies and other tracking
              technologies to collect and store your information.
            </Box>
            <Box>
              We may use cookies and similar tracking technologies (like web
              beacons and pixels) to access or store information. Specific
              information about how we use such technologies and how you can
              refuse certain cookies is set out in our Cookie Notice.
            </Box>
            <Heading as="h3" size="md" id="sociallogins">
              6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> If you choose to register or log in to
              our Services using a social media account, we may have access to
              certain information about you.
            </Box>
            <Box>
              Our Services offer you the ability to register and log in using
              your third-party social media account details (like your Facebook
              or Twitter logins). Where you choose to do this, we will receive
              certain profile information about you from your social media
              provider. The profile information we receive may vary depending on
              the social media provider concerned, but will often include your
              name, email address, friends list, and profile picture, as well as
              other information you choose to make public on such a social media
              platform.
            </Box>
            <Box>
              We will use the information we receive only for the purposes that
              are described in this privacy notice or that are otherwise made
              clear to you on the relevant Services. Please note that we do not
              control, and are not responsible for, other uses of your personal
              information by your third-party social media provider. We
              recommend that you review their privacy notice to understand how
              they collect, use, and share your personal information, and how
              you can set your privacy preferences on their sites and apps.
            </Box>
            <Heading as="h3" size="md" id="inforetain">
              7. HOW LONG DO WE KEEP YOUR INFORMATION?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> We keep your information for as long
              as necessary to fulfil the purposes outlined in this privacy
              notice unless otherwise required by law.
            </Box>
            <Box>
              We will only keep your personal information for as long as it is
              necessary for the purposes set out in this privacy notice, unless
              a longer retention period is required or permitted by law (such as
              tax, accounting, or other legal requirements). No purpose in this
              notice will require us keeping your personal information for
              longer than the period of time in which users have an account with
              us.
            </Box>
            <Box>
              When we have no ongoing legitimate business need to process your
              personal information, we will either delete or anonymise such
              information, or, if this is not possible (for example, because
              your personal information has been stored in backup archives),
              then we will securely store your personal information and isolate
              it from any further processing until deletion is possible.
            </Box>
            <Heading as="h3" size="md" id="infosafe">
              8. HOW DO WE KEEP YOUR INFORMATION SAFE?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> We aim to protect your personal
              information through a system of organisational and technical
              security measures.
            </Box>
            <Box>
              We have implemented appropriate and reasonable technical and
              organisational security measures designed to protect the security
              of any personal information we process. However, despite our
              safeguards and efforts to secure your information, no electronic
              transmission over the Internet or information storage technology
              can be guaranteed to be 100% secure, so we cannot promise or
              guarantee that hackers, cybercriminals, or other unauthorised
              third parties will not be able to defeat our security and
              improperly collect, access, steal, or modify your information.
              Although we will do our best to protect your personal information,
              transmission of personal information to and from our Services is
              at your own risk. You should only access the Services within a
              secure environment.
            </Box>
            <Heading as="h3" size="md" id="privacyrights">
              9. WHAT ARE YOUR PRIVACY RIGHTS?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> In some regions, such as the European
              Economic Area (EEA), United Kingdom (UK), and Canada, you have
              rights that allow you greater access to and control over your
              personal information. You may review, change, or terminate your
              account at any time.
            </Box>
            <Box>
              In some regions (like the EEA, UK, and Canada), you have certain
              rights under applicable data protection laws. These may include
              the right (i) to request access and obtain a copy of your personal
              information, (ii) to request rectification or erasure; (iii) to
              restrict the processing of your personal information; and (iv) if
              applicable, to data portability. In certain circumstances, you may
              also have the right to object to the processing of your personal
              information. You can make such a request by contacting us by using
              the contact details provided in the section{" "}
              <Link as={NextLink} href="#contact">
                HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              </Link>{" "}
              below.
            </Box>
            <Box>
              We will consider and act upon any request in accordance with
              applicable data protection laws.
            </Box>
            <Box>
              If you are located in the EEA or UK and you believe we are
              unlawfully processing your personal information, you also have the
              right to complain to your local data protection supervisory
              authority. You can find their contact details here:
              https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
            </Box>
            <Box>
              If you are located in Switzerland, the contact details for the
              data protection authorities are available here:
              https://www.edoeb.admin.ch/edoeb/en/home.html.
            </Box>
            <Box id="withdrawconsent">
              <Box as="b">Withdrawing your consent:</Box> If we are relying on
              your consent to process your personal information, which may be
              express and/or implied consent depending on the applicable law,
              you have the right to withdraw your consent at any time. You can
              withdraw your consent at any time by contacting us by using the
              contact details provided in the section{" "}
              <Link as={NextLink} href="#contact">
                HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
              </Link>{" "}
              below.
            </Box>
            <Box>
              However, please note that this will not affect the lawfulness of
              the processing before its withdrawal nor, when applicable law
              allows, will it affect the processing of your personal information
              conducted in reliance on lawful processing grounds other than
              consent.
            </Box>
            <Box as="b">Account Information</Box>
            <Box>
              If you would at any time like to review or change the information
              in your account or terminate your account, you can:
            </Box>
            <UnorderedList>
              <ListItem>
                Log in to your account settings and update your user account.
              </ListItem>
            </UnorderedList>
            <Box>
              Upon your request to terminate your account, we will deactivate or
              delete your account and information from our active databases.
              However, we may retain some information in our files to prevent
              fraud, troubleshoot problems, assist with any investigations,
              enforce our legal terms and/or comply with applicable legal
              requirements.
            </Box>
            <Box>
              Cookies and similar technologies: Most Web browsers are set to
              accept cookies by default. If you prefer, you can usually choose
              to set your browser to remove cookies and to reject cookies. If
              you choose to remove cookies or reject cookies, this could affect
              certain features or services of our Services. To opt out of
              interest-based advertising by advertisers on our Services visit
              http://www.aboutads.info/choices/.
            </Box>
            <Box>
              If you have questions or comments about your privacy rights, you
              may email us at <strong>info@deinlog.com</strong>.
            </Box>
            <Heading as="h3" size="md" id="DNT">
              10. CONTROLS FOR DO-NOT-TRACK FEATURES
            </Heading>
            <Box>
              Most web browsers and some mobile operating systems and mobile
              applications include a Do-Not-Track (DNT) feature or setting you
              can activate to signal your privacy preference not to have data
              about your online browsing activities monitored and collected. At
              this stage no uniform technology standard for recognising and
              implementing DNT signals has been finalised. As such, we do not
              currently respond to DNT browser signals or any other mechanism
              that automatically communicates your choice not to be tracked
              online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a
              revised version of this privacy notice.
            </Box>
            <Heading as="h3" size="md" id="caresidents">
              11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </Heading>
            <Box as="i">
              <Box as="b">In Short:</Box> Yes, if you are a resident of
              California, you are granted specific rights regarding access to
              your personal information.
            </Box>
            <Box>
              California Civil Code Section 1798.83, also known as the Shine The
              Light law, permits our users who are California residents to
              request and obtain from us, once a year and free of charge,
              information about categories of personal information (if any) we
              disclosed to third parties for direct marketing purposes and the
              names and addresses of all third parties with which we shared
              personal information in the immediately preceding calendar year.
              If you are a California resident and would like to make such a
              request, please submit your request in writing to us using the
              contact information provided below.
            </Box>
            <Box>
              If you are under 18 years of age, reside in California, and have a
              registered account with Services, you have the right to request
              removal of unwanted data that you publicly post on the Services.
              To request removal of such data, please contact us using the
              contact information provided below and include the email address
              associated with your account and a statement that you reside in
              California. We will make sure the data is not publicly displayed
              on the Services, but please be aware that the data may not be
              completely or comprehensively removed from all our systems (e.g.
              backups, etc.).
            </Box>
            <Box>
              <Box as="b">CCPA Privacy Notice</Box>
            </Box>
            <Box>The California Code of Regulations defines a resident as:</Box>
            <OrderedList>
              <ListItem>
                every individual who is in the State of California for other
                than a temporary or transitory purpose and
              </ListItem>
              <ListItem>
                every individual who is domiciled in the State of California who
                is outside the State of California for a temporary or transitory
                purpose
              </ListItem>
            </OrderedList>
            <Box>All other individuals are defined as non-residents.</Box>
            <Box>
              If this definition of resident applies to you, we must adhere to
              certain rights and obligations regarding your personal
              information.
            </Box>
            <Box>
              <Box as="b">
                What categories of personal information do we collect?
              </Box>
            </Box>
            <Box>
              We have collected the following categories of personal information
              in the past twelve (12) months:
            </Box>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Category</Th>
                    <Th>Examples</Th>
                    <Th>Collected</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>A. Identifiers</Td>
                    <Td>
                      Contact details, such as real name, alias, postal address,
                      telephone or mobile contact number, unique personal
                      identifier, online identifier, Internet Protocol address,
                      email address, and account nam
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      B. Personal information categories listed in the
                      California Customer Records statute
                    </Td>
                    <Td>
                      Name, contact information, education, employment,
                      employment history, and financial information
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      C. Protected classification characteristics under
                      California or federal law
                    </Td>
                    <Td>Gender and date of birth</Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>D. Commercial information</Td>
                    <Td>
                      Transaction information, purchase history, financial
                      details, and payment information
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>E. Biometric information</Td>
                    <Td>Fingerprints and voiceprints</Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>F. Internet or other similar network activity</Td>
                    <Td>
                      Browsing history, search history, online behaviour,
                      interest data, and interactions with our and other
                      websites, applications, systems, and advertisements
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>G. Geolocation data</Td>
                    <Td>Device location</Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      H. Audio, electronic, visual, thermal, olfactory, or
                      similar information
                    </Td>
                    <Td>
                      Images and audio, video or call recordings created in
                      connection with our business activities
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>I. Professional or employment-related information</Td>
                    <Td>
                      Business contact details in order to provide you our
                      Services at a business level or job title, work history,
                      and professional qualifications if you apply for a job
                      with us
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>J. Education Information</Td>
                    <Td>Student records and directory information</Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>K. Inferences drawn from other personal information</Td>
                    <Td>
                      {
                        "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics"
                      }
                    </Td>
                    <Td>NO</Td>
                  </Tr>
                  <Tr>
                    <Td>L. Sensitive Personal Information</Td>
                    <Td></Td>
                    <Td>NO</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Box>
              We may also collect other personal information outside of these
              categories through instances where you interact with us in person,
              online, or by phone or mail in the context of:
            </Box>
            <UnorderedList>
              <ListItem>
                Receiving help through our customer support channels;
              </ListItem>
              <ListItem>
                Participation in customer surveys or contests; and
              </ListItem>
              <ListItem>
                Facilitation in the delivery of our Services and to respond to
                your inquiries.
              </ListItem>
            </UnorderedList>
            <Box>
              <Box as="b">
                How do we use and share your personal information?
              </Box>
            </Box>
            <Box>
              More information about our data collection and sharing practices
              can be found in this privacy notice. You may contact us by email
              at <strong>info@deinlog.com</strong>, or by referring to the
              contact details at the bottom of this document. If you are using
              an authorised agent to exercise your right to opt out we may deny
              a request if the authorised agent does not submit proof that they
              have been validly authorised to act on your behalf.
            </Box>
            <Box>
              <Box as="b">
                Will your information be shared with anyone else?
              </Box>
            </Box>
            <Box>
              We may disclose your personal information with our service
              providers pursuant to a written contract between us and each
              service provider. Each service provider is a for-profit entity
              that processes the information on our behalf, following the same
              strict privacy protection obligations mandated by the CCPA. We may
              use your personal information for our own business purposes, such
              as for undertaking internal research for technological development
              and demonstration. This is not considered to be selling of your
              personal information. deinlog.com has not disclosed, sold, or
              shared any personal information to third parties for a business or
              commercial purpose in the preceding twelve (12) months.
              deinlog.com will not sell or share personal information in the
              future belonging to website visitors, users, and other consumers.
            </Box>
            <Box>
              <Box as="b">Your rights with respect to your personal data</Box>
            </Box>
            <Box>
              <Box as="u">
                Right to request deletion of the data — Request to delete
              </Box>
            </Box>
            <Box>
              You can ask for the deletion of your personal information. If you
              ask us to delete your personal information, we will respect your
              request and delete your personal information, subject to certain
              exceptions provided by law, such as (but not limited to) the
              exercise by another consumer of his or her right to free speech,
              our compliance requirements resulting from a legal obligation, or
              any processing that may be required to protect against illegal
              activities.
            </Box>
            <Box>
              <Box as="u">Right to be informed — Request to know</Box>
            </Box>
            <Box>Depending on the circumstances, you have a right to know:</Box>
            <UnorderedList>
              <ListItem>
                whether we collect and use your personal information;
              </ListItem>
              <ListItem>
                the categories of personal information that we collect;
              </ListItem>
              <ListItem>
                the purposes for which the collected personal information is
                used;
              </ListItem>
              <ListItem>
                whether we sell or share personal information to third parties;
              </ListItem>
              <ListItem>
                the categories of personal information that we sold, shared, or
                disclosed for a business purpose;
              </ListItem>
              <ListItem>
                the categories of third parties to whom the personal information
                was sold, shared, or disclosed for a business purpose;
              </ListItem>
              <ListItem>
                the business or commercial purpose for collecting, selling, or
                sharing personal information; and
              </ListItem>
              <ListItem>
                the specific pieces of personal information we collected about
                you.
              </ListItem>
            </UnorderedList>
            <Box>
              In accordance with applicable law, we are not obligated to provide
              or delete consumer information that is de-identified in response
              to a consumer request or to re-identify individual data to verify
              a consumer request.
            </Box>
            <Box>
              <Box as="u">
                {
                  "Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights"
                }
              </Box>
            </Box>
            <Box>
              We will not discriminate against you if you exercise your privacy
              rights.
            </Box>
            <Box>
              <Box as="u">
                Right to Limit Use and Disclosure of Sensitive Personal
                Information
              </Box>
            </Box>
            <Box>
              {"We do not process consumer's sensitive personal information."}
            </Box>
            <Box>
              <Box as="u">Verification process</Box>
            </Box>
            <Box>
              Upon receiving your request, we will need to verify your identity
              to determine you are the same person about whom we have the
              information in our system. These verification efforts require us
              to ask you to provide information so that we can match it with
              information you have previously provided us. For instance,
              depending on the type of request you submit, we may ask you to
              provide certain information so that we can match the information
              you provide with the information we already have on file, or we
              may contact you through a communication method (e.g. phone or
              email) that you have previously provided to us. We may also use
              other verification methods as the circumstances dictate.
            </Box>
            <Box>
              We will only use personal information provided in your request to
              verify your identity or authority to make the request. To the
              extent possible, we will avoid requesting additional information
              from you for the purposes of verification. However, if we cannot
              verify your identity from the information already maintained by
              us, we may request that you provide additional information for the
              purposes of verifying your identity and for security or
              fraud-prevention purposes. We will delete such additionally
              provided information as soon as we finish verifying you.
            </Box>
            <Box>
              <Box as="u">Other privacy rights</Box>
            </Box>
            <UnorderedList>
              <ListItem>
                You may object to the processing of your personal information.
              </ListItem>
              <ListItem>
                You may request correction of your personal data if it is
                incorrect or no longer relevant, or ask to restrict the
                processing of the information.
              </ListItem>
              <ListItem>
                You can designate an authorised agent to make a request under
                the CCPA on your behalf. We may deny a request from an
                authorised agent that does not submit proof that they have been
                validly authorised to act on your behalf in accordance with the
                CCPA.
              </ListItem>
              <ListItem>
                You may request to opt out from future selling or sharing of
                your personal information to third parties. Upon receiving an
                opt-out request, we will act upon the request as soon as
                feasibly possible, but no later than fifteen (15) days from the
                date of the request submission.
              </ListItem>
            </UnorderedList>
            <Box>
              To exercise these rights, you can contact us by email at
              <strong>info@deinlog.com</strong>, or by referring to the contact
              details at the bottom of this document. If you have a complaint
              about how we handle your data, we would like to hear from you.
            </Box>
            <Heading as="h3" size="md" id="virginia">
              12. DO VIRGINIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </Heading>
            <Box>
              <Box as="b">In Short: </Box> Yes, if you are a resident of
              Virginia, you may be granted specific rights regarding access to
              and use of your personal information.
            </Box>
            <Box>
              <Box as="b">Virginia CDPA Privacy Notice</Box>
            </Box>
            <Box>
              Under the Virginia Consumer Data Protection Act (CDPA): Consumer
              means a natural person who is a resident of the Commonwealth
              acting only in an individual or household context. It does not
              include a natural person acting in a commercial or employment
              context. Personal data means any information that is linked or
              reasonably linkable to an identified or identifiable natural
              person. Personal data does not include de-identified data or
              publicly available information. Sale of personal data means the
              exchange of personal data for monetary consideration. If this
              definition consumer applies to you, we must adhere to certain
              rights and obligations regarding your personal data. The
              information we collect, use, and disclose about you will vary
              depending on how you interact with deinlog.com and our Services.
              To find out more, please visit the following links:
            </Box>
            <UnorderedList>
              <ListItem>
                <Link as={NextLink} href="#infocollect">
                  Personal data we collect
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="#infouse">
                  How we use your personal data
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="#whoshare">
                  When and with whom we share your personal data
                </Link>
              </ListItem>
            </UnorderedList>
            <Box>
              <Box as="u">Your rights with respect to your personal data</Box>
            </Box>
            <UnorderedList>
              <ListItem>
                Right to be informed whether or not we are processing your
                personal data
              </ListItem>
              <ListItem>Right to access your personal data</ListItem>
              <ListItem>
                Right to correct inaccuracies in your personal data
              </ListItem>
              <ListItem>
                Right to request deletion of your personal data
              </ListItem>
              <ListItem>
                Right to obtain a copy of the personal data you previously
                shared with us
              </ListItem>
              <ListItem>
                Right to opt out of the processing of your personal data if it
                is used for targeted advertising, the sale of personal data, or
                profiling in furtherance of decisions that produce legal or
                similarly significant effects (profiling)
              </ListItem>
            </UnorderedList>
            <Box>
              deinlog.com has not sold any personal data to third parties for
              business or commercial purposes. deinlog.com will not sell
              personal data in the future belonging to website visitors, users,
              and other consumers.
            </Box>
            <Box>
              <Box as="u">
                Exercise your rights provided under the Virginia CDPA
              </Box>
            </Box>
            <Box>
              More information about our data collection and sharing practices
              can be found in this privacy notice. You may contact us by email
              at <strong>info@deinlog.com</strong>, by visiting
              http://www.deinlog.com, or by referring to the contact details at
              the bottom of this document. If you are using an authorised agent
              to exercise your rights, we may deny a request if the authorised
              agent does not submit proof that they have been validly authorised
              to act on your behalf.
            </Box>
            <Box>
              <Box as="u">Verification process</Box>
            </Box>
            <Box>
              We may request that you provide additional information reasonably
              necessary to verify you and your consumer request. If you submit
              the request through an authorised agent, we may need to collect
              additional information to verify your identity before processing
              your request. Upon receiving your request, we will respond without
              undue delay, but in all cases, within forty-five (45) days of
              receipt. The response period may be extended once by forty-five
              (45) additional days when reasonably necessary. We will inform you
              of any such extension within the initial 45-day response period,
              together with the reason for the extension.
            </Box>
            <Box>
              <Box as="u">Right to appeal</Box>
            </Box>
            <Box>
              If we decline to take action regarding your request, we will
              inform you of our decision and reasoning behind it. If you wish to
              appeal our decision, please email us at info@deinlog.com. Within
              sixty (60) days of receipt of an appeal, we will inform you in
              writing of any action taken or not taken in response to the
              appeal, including a written explanation of the reasons for the
              decisions. If your appeal if denied, you may contact the Attorney
              General to{" "}
              <Link
                as={NextLink}
                href="https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint"
                target="_blank"
              >
                submit a complaint
              </Link>
              .
            </Box>
            <Heading as="h3" size="md" id="policyupdates">
              13. DO WE MAKE UPDATES TO THIS NOTICE?
            </Heading>
            <Box>
              <Box as="b">In Short: </Box>Yes, we will update this notice as
              necessary to stay compliant with relevant laws.
            </Box>
            <Box>
              We may update this privacy notice from time to time. The updated
              version will be indicated by an updated Revised date and the
              updated version will be effective as soon as it is accessible. If
              we make material changes to this privacy notice, we may notify you
              either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review
              this privacy notice frequently to be informed of how we are
              protecting your information.
            </Box>
            <Heading as="h3" size="md" id="contact">
              14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </Heading>
            <Box>
              If you have questions or comments about this notice, you may email
              us at <strong>info@deinlog.com</strong>
            </Box>
            <Heading as="h3" size="md" id="request">
              15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </Heading>
            <Box>
              Based on the applicable laws of your country, you may have the
              right to request access to the personal information we collect
              from you, change that information, or delete it. To request to
              review, update, or delete your personal information, please visit:
              <Link href="/">http://www.deinlog.com</Link>.
            </Box>
          </Container>
        )}
      </>
    </Layout>
  );
}
