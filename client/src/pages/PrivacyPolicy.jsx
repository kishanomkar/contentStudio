import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import '../styles/shared.css'
import '../styles/legal.css'

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Navbar2 />
            <div className="legal-container">
                <div className="legal-header">
                    <h1>Privacy Policy</h1>
                    <p>Last Updated: March 8, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. Introduction</h2>
                        <p>contentStudio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Service").</p>
                        <p>Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service. Your use of contentStudio indicates your acceptance of this Privacy Policy.</p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <h3>2.1 Information You Provide Directly</h3>
                        <ul>
                            <li><strong>Account Registration:</strong> Name, email address, password, and profile information</li>
                            <li><strong>Billing Information:</strong> Payment method, billing address, and transaction history</li>
                            <li><strong>Content:</strong> Any text, images, videos, or other files you upload or create using our Service</li>
                            <li><strong>Communications:</strong> Messages, feedback, support requests, and other correspondence</li>
                            <li><strong>Social Media Integration:</strong> Information from your YouTube, Gmail, and other connected accounts</li>
                        </ul>

                        <h3>2.2 Information Collected Automatically</h3>
                        <ul>
                            <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address</li>
                            <li><strong>Usage Data:</strong> Pages visited, features used, time spent, clicks, and interactions</li>
                            <li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to track your activity</li>
                            <li><strong>Location Data:</strong> General geographical location based on IP address</li>
                        </ul>

                        <h3>2.3 Information from Third Parties</h3>
                        <ul>
                            <li>Data from social media platforms (YouTube, Google, Gmail)</li>
                            <li>Information from payment processors</li>
                            <li>Data from analytics providers</li>
                            <li>Information from third-party service integrations</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the information we collect for the following purposes:</p>
                        <ul>
                            <li><strong>Service Delivery:</strong> To provide, maintain, and improve our Service</li>
                            <li><strong>Account Management:</strong> To create and manage your account</li>
                            <li><strong>Billing:</strong> To process payments and send billing information</li>
                            <li><strong>Communication:</strong> To send transactional emails, notifications, and customer support</li>
                            <li><strong>Marketing:</strong> To send promotional emails and marketing communications (with your consent)</li>
                            <li><strong>Personalization:</strong> To personalize your experience and provide recommendations</li>
                            <li><strong>Analytics:</strong> To understand how users interact with our Service</li>
                            <li><strong>Security:</strong> To detect, investigate, and prevent fraud and security incidents</li>
                            <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms of Service</li>
                            <li><strong>AI Improvement:</strong> To improve our AI models using anonymized or aggregated data (with consent)</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. How We Share Your Information</h2>
                        <p>We may share your information in the following circumstances:</p>
                        <h3>4.1 Service Providers</h3>
                        <p>We share information with third-party service providers who assist us in operating our website and delivering services, including:</p>
                        <ul>
                            <li>Cloud hosting providers</li>
                            <li>Payment processors</li>
                            <li>Email service providers</li>
                            <li>Analytics platforms</li>
                            <li>Customer support tools</li>
                            <li>AI and machine learning providers</li>
                        </ul>

                        <h3>4.2 Business Transfers</h3>
                        <p>If contentStudio is merged, acquired, or sold, your information may be transferred as part of that transaction. We will provide notice before your personal information becomes subject to a different privacy policy.</p>

                        <h3>4.3 Legal Requirements</h3>
                        <p>We may disclose your information if required to do so by law or if we believe in good faith that such disclosure is necessary to:</p>
                        <ul>
                            <li>Comply with legal obligations</li>
                            <li>Protect the rights, privacy, or safety of ourselves or others</li>
                            <li>Enforce our Terms of Service and other agreements</li>
                            <li>Respond to lawful requests from government authorities</li>
                        </ul>

                        <h3>4.4 Third-Party Integrations</h3>
                        <p>When you connect your YouTube, Gmail, or other social media accounts, we share necessary information with those platforms to provide integrated features. These third parties operate under their own privacy policies.</p>

                        <h3>4.5 With Your Consent</h3>
                        <p>We may share your information with other third parties if you explicitly consent to such sharing.</p>
                    </section>

                    <section>
                        <h2>5. Data Security</h2>
                        <h3>5.1 Security Measures</h3>
                        <p>We implement comprehensive security measures to protect your personal information, including:</p>
                        <ul>
                            <li>SSL encryption for data in transit</li>
                            <li>Secure password hashing</li>
                            <li>Access controls and authentication</li>
                            <li>Regular security audits</li>
                            <li>Firewalls and intrusion detection systems</li>
                        </ul>

                        <h3>5.2 Data Retention</h3>
                        <p>We retain your personal information for as long as necessary to provide our Service and comply with legal obligations. You may request deletion of your account and associated data at any time.</p>

                        <h3>5.3 Security Limitations</h3>
                        <p>While we implement strong security measures, no system is completely secure. We cannot guarantee absolute security of your information. You use our Service at your own risk.</p>
                    </section>

                    <section>
                        <h2>6. Your Privacy Rights and Choices</h2>
                        <h3>6.1 Access and Correction</h3>
                        <p>You have the right to access and correct your personal information. You can update your account settings or contact us for assistance.</p>

                        <h3>6.2 Data Deletion</h3>
                        <p>You may request deletion of your account and associated personal data. We will process such requests within a reasonable timeframe, except where legal or contractual obligations require us to retain the data.</p>

                        <h3>6.3 Opt-Out of Marketing</h3>
                        <p>You can opt-out of promotional emails by clicking the "unsubscribe" link in any marketing email or by updating your account preferences.</p>

                        <h3>6.4 Cookie Preferences</h3>
                        <p>You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our Service.</p>

                        <h3>6.5 AI Training Opt-Out</h3>
                        <p>You can opt-out of having your data used for AI model training in your account settings. This will not affect your ability to use the Service.</p>

                        <h3>6.6 Regional Rights</h3>
                        <p>If you are located in the EU, California, or other regions with privacy laws, you may have additional rights including GDPR rights and CCPA rights. Contact us for more information.</p>
                    </section>

                    <section>
                        <h2>7. Cookies and Tracking Technologies</h2>
                        <h3>7.1 What We Track</h3>
                        <p>We use cookies, web beacons, pixels, and similar technologies to:</p>
                        <ul>
                            <li>Remember your preferences</li>
                            <li>Understand how you use our Service</li>
                            <li>Deliver personalized content</li>
                            <li>Measure the effectiveness of marketing campaigns</li>
                            <li>Detect and prevent fraud</li>
                        </ul>

                        <h3>7.2 Types of Cookies</h3>
                        <ul>
                            <li><strong>Essential:</strong> Required for basic functionality</li>
                            <li><strong>Functional:</strong> Enhance user experience</li>
                            <li><strong>Analytics:</strong> Track how users interact with our Service</li>
                            <li><strong>Marketing:</strong> Used for targeted advertising</li>
                        </ul>

                        <h3>7.3 Third-Party Tracking</h3>
                        <p>Third-party service providers (analytics, advertising, social media) may also place cookies on your device. We do not control their cookies or their privacy practices.</p>
                    </section>

                    <section>
                        <h2>8. Third-Party Links and Services</h2>
                        <p>Our Service may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to third-party services, and we are not responsible for their privacy practices. Please review their privacy policies before using their services.</p>
                    </section>

                    <section>
                        <h2>9. Children's Privacy</h2>
                        <p>contentStudio is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will delete such information and terminate the child's account. If you believe we have collected information from a child, please contact us immediately.</p>
                    </section>

                    <section>
                        <h2>10. International Data Transfers</h2>
                        <p>Your information may be transferred to, stored in, and processed in countries other than your country of residence, which may have different data protection laws. By using our Service, you consent to such transfers. We implement appropriate safeguards, including standard contractual clauses and privacy shield mechanisms, to protect your information.</p>
                    </section>

                    <section>
                        <h2>11. California Privacy Rights (CCPA)</h2>
                        <p>If you are a California resident, you have specific rights under the California Consumer Privacy Act:</p>
                        <ul>
                            <li><strong>Right to Know:</strong> You can request what personal information we collect, use, and share</li>
                            <li><strong>Right to Delete:</strong> You can request deletion of your personal information</li>
                            <li><strong>Right to Opt-Out:</strong> You can opt-out of the sale or sharing of your personal information</li>
                            <li><strong>Right to Correct:</strong> You can request correction of inaccurate information</li>
                            <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your rights</li>
                        </ul>
                        <p>To exercise these rights, contact us using the information in Section 15.</p>
                    </section>

                    <section>
                        <h2>12. European Privacy Rights (GDPR)</h2>
                        <p>If you are located in the European Union, you have rights under the General Data Protection Regulation:</p>
                        <ul>
                            <li><strong>Right to Access:</strong> You can request access to your personal data</li>
                            <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data</li>
                            <li><strong>Right to Erasure:</strong> You can request deletion of your data</li>
                            <li><strong>Right to Restrict Processing:</strong> You can request limitation of how we process your data</li>
                            <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
                            <li><strong>Right to Object:</strong> You can object to certain processing activities</li>
                            <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent at any time</li>
                        </ul>
                        <p>To exercise these rights or lodge a complaint, contact us using the information in Section 15, or contact your local data protection authority.</p>
                    </section>

                    <section>
                        <h2>13. User Content and Privacy</h2>
                        <p>You are responsible for ensuring that any content you upload to contentStudio does not violate the privacy rights of others. We do not monitor user-generated content and are not responsible for ensuring it complies with privacy laws. However, we reserve the right to remove content that violates privacy rights or our policies.</p>
                    </section>

                    <section>
                        <h2>14. Changes to This Privacy Policy</h2>
                        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our Service after such changes constitutes your acceptance of the updated Privacy Policy.</p>
                    </section>

                    <section>
                        <h2>15. Contact Us</h2>
                        <p>If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:</p>
                        <div className="contact-info">
                            <p><strong>contentStudio Privacy Team</strong></p>
                            <p>Email: privacy@contentstudio.com</p>
                            <p>Website: www.contentstudio.com</p>
                            <p>Support: support@contentstudio.com</p>
                        </div>
                        <p>We will respond to your inquiry within 30 days.</p>
                    </section>

                    <section>
                        <h2>16. Data Protection Officer</h2>
                        <p>If required by applicable law, we have appointed a Data Protection Officer to oversee our privacy compliance. You can contact them at: dpo@contentstudio.com</p>
                    </section>

                    <section>
                        <p className="footer-note">Thank you for trusting contentStudio with your information. We are committed to protecting your privacy and ensuring transparency in how we handle your data.</p>
                        <p><Link to="/terms-of-service">View our Terms of Service</Link></p>
                    </section>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="nav-logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">Content<span className="logo-accent">Studio</span> AI</span>
                    </div>
                    <div className="footer-links">
                        <Link to="/terms-of-service">Terms of Service</Link>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </div>
                    <p className="footer-copy">© 2026 Content Studio AI. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
