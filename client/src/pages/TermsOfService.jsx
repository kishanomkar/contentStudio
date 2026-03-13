import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar2 from '../components/Navbar2'
import '../styles/shared.css'
import '../styles/legal.css'

export default function TermsOfService() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Navbar2 />
            <div className="legal-container">
                <div className="legal-header">
                    <h1>Terms of Service</h1>
                    <p>Last Updated: March 8, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. Agreement to Terms</h2>
                        <p>By accessing and using contentStudio ("Service"), you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions outlined in this document. If you do not agree with any part of these terms, please refrain from using our Service.</p>
                    </section>

                    <section>
                        <h2>2. Service Description</h2>
                        <p>contentStudio is a comprehensive content creation and analysis platform that provides tools and services including, but not limited to:</p>
                        <ul>
                            <li>Email content analysis and processing</li>
                            <li>YouTube content analysis and comment processing</li>
                            <li>Speech-to-text conversion</li>
                            <li>Text-to-speech conversion</li>
                            <li>Text-to-video generation</li>
                            <li>Thumbnail generation</li>
                            <li>Content deals and opportunities tracking</li>
                            <li>AI-powered content insights</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. User Eligibility</h2>
                        <p>You must be at least 18 years old or the legal age of majority in your jurisdiction to use this Service. By using contentStudio, you represent and warrant that you have the legal capacity to enter into binding agreements.</p>
                    </section>

                    <section>
                        <h2>4. User Accounts and Security</h2>
                        <h3>4.1 Account Creation</h3>
                        <ul>
                            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                            <li>You agree to provide accurate, complete, and current information during registration</li>
                            <li>You are solely responsible for all activities that occur under your account</li>
                        </ul>

                        <h3>4.2 Password Protection</h3>
                        <ul>
                            <li>You must keep your password secure and not share it with third parties</li>
                            <li>You are responsible for all use of your account, whether or not you authorize it</li>
                            <li>You agree to immediately notify us of any unauthorized use of your account</li>
                        </ul>

                        <h3>4.3 Account Termination</h3>
                        <ul>
                            <li>You may terminate your account at any time by contacting our support team</li>
                            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Intellectual Property Rights</h2>
                        <h3>5.1 Our Intellectual Property</h3>
                        <ul>
                            <li>All content, features, and functionality of contentStudio (including but not limited to software, code, design, and text) are the exclusive property of contentStudio or its content suppliers and are protected by copyright and other intellectual property laws</li>
                        </ul>

                        <h3>5.2 User Content</h3>
                        <ul>
                            <li>You retain all rights to the content you upload or create using our Service</li>
                            <li>By uploading content to contentStudio, you grant us a non-exclusive, worldwide, royalty-free license to use, copy, modify, and display your content for the purpose of providing and improving our Service</li>
                            <li>You warrant that you own or have the necessary rights to all content you upload</li>
                        </ul>

                        <h3>5.3 Restrictions on Use</h3>
                        <ul>
                            <li>You may not reproduce, distribute, modify, or transmit any content from contentStudio without our prior written consent</li>
                            <li>You may not reverse engineer, decompile, or attempt to discover the source code or underlying technology of our Service</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. User Responsibilities and Conduct</h2>
                        <p>You agree not to use contentStudio in any way that:</p>
                        <ul>
                            <li>Violates any applicable laws or regulations</li>
                            <li>Infringes upon the intellectual property rights of others</li>
                            <li>Harasses, bullies, or defames any person</li>
                            <li>Transmits any viruses, malware, or harmful code</li>
                            <li>Attempts to gain unauthorized access to the Service or its systems</li>
                            <li>Interferes with the normal operation of the Service</li>
                            <li>Disrupts the flow of dialogue within our community or on the platform</li>
                            <li>Creates multiple accounts to circumvent restrictions or manipulate the platform</li>
                            <li>Uses the Service for spam, phishing, or deceptive purposes</li>
                            <li>Violates our content policy or community guidelines</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Content Policy</h2>
                        <h3>7.1 Prohibited Content</h3>
                        <p>Users may not upload, generate, or share content that:</p>
                        <ul>
                            <li>Contains hate speech, discrimination, or violence</li>
                            <li>Is sexually explicit or pornographic</li>
                            <li>Includes illegal activities or instructions for illegal acts</li>
                            <li>Violates privacy rights or contains personal information of others without consent</li>
                            <li>Is false, misleading, or deliberately deceptive</li>
                            <li>Infringes on copyrights, trademarks, or other intellectual property rights</li>
                            <li>Exploits or harms children in any way</li>
                        </ul>

                        <h3>7.2 Content Moderation</h3>
                        <p>We reserve the right to review, modify, or remove content that violates these policies. We may suspend or terminate accounts of users who repeatedly violate content policies.</p>
                    </section>

                    <section>
                        <h2>8. Use of Artificial Intelligence</h2>
                        <h3>8.1 AI-Powered Features</h3>
                        <p>contentStudio uses artificial intelligence and machine learning to provide various services including content analysis, generation, and recommendations.</p>

                        <h3>8.2 AI Limitations</h3>
                        <ul>
                            <li>AI-generated content may not always be accurate, complete, or suitable for all purposes</li>
                            <li>You should review and verify any AI-generated content before use or publication</li>
                            <li>We do not guarantee the accuracy, quality, or appropriateness of AI-generated outputs</li>
                        </ul>

                        <h3>8.3 Data Usage for AI Training</h3>
                        <ul>
                            <li>We may use anonymized or aggregated data to improve our AI models</li>
                            <li>Your personal data will not be used to train AI models without your explicit consent</li>
                            <li>You can opt-out of data usage for AI improvement in your account settings</li>
                        </ul>
                    </section>

                    <section>
                        <h2>9. Limitation of Liability</h2>
                        <h3>9.1 Disclaimer</h3>
                        <p>contentStudio is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the Service, including any warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>

                        <h3>9.2 Limitation</h3>
                        <p>To the fullest extent permitted by law, contentStudio and its owners, operators, and service providers shall not be liable for:</p>
                        <ul>
                            <li>Any indirect, incidental, consequential, special, or punitive damages</li>
                            <li>Loss of profits, data, revenue, or business opportunity</li>
                            <li>Any damages arising from unauthorized access or alteration of your content</li>
                            <li>Any damages resulting from third-party actions or services</li>
                            <li>Any claim arising out of your use of the Service</li>
                        </ul>

                        <h3>9.3 Cap on Liability</h3>
                        <p>Except where prohibited by law, our total liability for any claim arising from your use of the Service shall not exceed the amount paid by you to contentStudio in the 12 months preceding the claim, or $100, whichever is greater.</p>
                    </section>

                    <section>
                        <h2>10. Third-Party Services and Integrations</h2>
                        <p>contentStudio may integrate with or rely upon third-party services, including but not limited to Google services, YouTube API, email providers, and AI language models.</p>
                        <h3>10.1 Third-Party Terms</h3>
                        <ul>
                            <li>Your use of third-party services is governed by their respective terms and conditions</li>
                            <li>We are not responsible for the availability, accuracy, or quality of third-party services</li>
                            <li>We are not liable for any issues arising from third-party service disruptions</li>
                        </ul>

                        <h3>10.2 Data Sharing</h3>
                        <ul>
                            <li>We may share necessary data with third-party service providers to deliver the Service</li>
                            <li>Third-party providers are bound by confidentiality agreements</li>
                        </ul>
                    </section>

                    <section>
                        <h2>11. Privacy and Data Protection</h2>
                        <h3>11.1 Data Collection</h3>
                        <p>We collect and process personal data in accordance with our Privacy Policy. Please review our <Link to="/privacy-policy">Privacy Policy</Link> for detailed information about our data practices.</p>

                        <h3>11.2 User Privacy</h3>
                        <ul>
                            <li>We respect your privacy and take measures to protect your personal information</li>
                            <li>You are responsible for ensuring that any data you upload does not violate the privacy rights of others</li>
                        </ul>

                        <h3>11.3 Cookies and Tracking</h3>
                        <p>We use cookies and similar technologies to enhance your experience. You can control cookie settings through your browser.</p>
                    </section>

                    <section>
                        <h2>12. Payment and Billing</h2>
                        <h3>12.1 Subscription Plans</h3>
                        <ul>
                            <li>contentStudio may offer various subscription plans with different features and pricing</li>
                            <li>Payment terms and billing cycles will be clearly displayed before purchase</li>
                            <li>Subscriptions automatically renew unless cancelled</li>
                        </ul>

                        <h3>12.2 Cancellation</h3>
                        <ul>
                            <li>You may cancel your subscription at any time</li>
                            <li>Cancellations take effect at the end of your current billing cycle</li>
                            <li>Refunds are not available for partially used subscription periods unless required by law</li>
                        </ul>

                        <h3>12.3 Pricing Changes</h3>
                        <ul>
                            <li>We reserve the right to change pricing with 30 days' notice</li>
                            <li>Changes will not apply to existing subscriptions until the next renewal</li>
                        </ul>
                    </section>

                    <section>
                        <h2>13. Service Availability and Maintenance</h2>
                        <h3>13.1 Uptime</h3>
                        <p>While we strive to maintain continuous service availability, we do not guarantee uninterrupted access to contentStudio.</p>

                        <h3>13.2 Maintenance</h3>
                        <p>We may conduct maintenance or updates that temporarily interrupt Service availability. We will attempt to provide advance notice when possible.</p>

                        <h3>13.3 Service Changes</h3>
                        <p>We reserve the right to modify, suspend, or discontinue features or the Service at any time.</p>
                    </section>

                    <section>
                        <h2>14. Indemnification</h2>
                        <p>You agree to indemnify and hold harmless contentStudio, its owners, operators, employees, and service providers from any claims, damages, losses, or liabilities (including legal fees) arising from:</p>
                        <ul>
                            <li>Your use of the Service</li>
                            <li>Your violation of these terms</li>
                            <li>Your violation of applicable laws</li>
                            <li>Your infringement of any third-party rights</li>
                            <li>Your content or actions on the platform</li>
                        </ul>
                    </section>

                    <section>
                        <h2>15. Dispute Resolution</h2>
                        <h3>15.1 Governing Law</h3>
                        <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law principles.</p>

                        <h3>15.2 Informal Resolution</h3>
                        <p>If a dispute arises, we encourage you to contact us first to attempt to resolve the matter informally.</p>

                        <h3>15.3 Arbitration</h3>
                        <p>Any legal dispute arising from these terms or your use of contentStudio shall be resolved through binding arbitration rather than in court, except where prohibited by law.</p>

                        <h3>15.4 Class Action Waiver</h3>
                        <p>You agree that any proceedings shall be conducted on an individual basis and not as a class action.</p>
                    </section>

                    <section>
                        <h2>16. Severability</h2>
                        <p>If any provision of these terms is found to be invalid or unenforceable, that provision shall be modified to the minimum extent necessary, or if not possible, severed. The remaining provisions shall continue in full force and effect.</p>
                    </section>

                    <section>
                        <h2>17. Entire Agreement</h2>
                        <p>These terms and conditions, together with our Privacy Policy, constitute the entire agreement between you and contentStudio regarding the Service and supersede all prior negotiations, representations, and agreements.</p>
                    </section>

                    <section>
                        <h2>18. Amendments to Terms</h2>
                        <p>We reserve the right to modify these terms at any time. We will notify you of significant changes via email or by posting the updated terms on our website. Your continued use of the Service following such modifications constitutes your acceptance of the updated terms.</p>
                    </section>

                    <section>
                        <h2>19. Waiver</h2>
                        <p>The failure of contentStudio to enforce any provision of these terms shall not constitute a waiver of that provision or any other provision.</p>
                    </section>

                    <section>
                        <h2>20. Contact Information</h2>
                        <p>If you have questions about these Terms and Conditions, or if you wish to contact us regarding a dispute or concern, please reach out to us at:</p>
                        <div className="contact-info">
                            <p><strong>contentStudio Support</strong></p>
                            <p>Email: support@contentstudio.com</p>
                            <p>Website: www.contentstudio.com</p>
                        </div>
                    </section>

                    <section>
                        <p className="footer-note">Thank you for using contentStudio. By using our Service, you acknowledge that you have read and agree to these Terms of Service.</p>
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
