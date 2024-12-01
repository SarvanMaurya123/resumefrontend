export default function Resume() {
    return (
        <div className="max-w-[210mm] mx-auto bg-white shadow-lg">
            <header className="bg-[#e6f3ff] p-8 text-center">
                <h1 className="text-[#1a365d] text-3xl font-bold mb-2">RICHARD SANCHEZ</h1>
                <p className="text-gray-600">Marketing Manager</p>
            </header>

            <div className="grid md:grid-cols-[2fr_3fr] gap-6 p-8">
                <div className="space-y-6">
                    <section>
                        <h2 className="text-[#1a365d] text-xl font-bold mb-4 border-b pb-2">CONTACT</h2>
                        <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="text-gray-600">+123-456-7890</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-gray-600">hello@example.com</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-gray-600">123 Anywhere St., Any City</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="text-gray-600">www.reallygreatsite.com</span>
                            </p>
                        </div>
                    </section>
                    <section>
                        <h2 className="text-[#1a365d] text-xl font-bold mb-4 border-b pb-2">EDUCATION</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">2029 - 2030</p>
                                <p className="font-semibold">BERKELEY UNIVERSITY</p>
                                <p className="text-gray-600">Master of Business Management</p>
                            </div>
                            <div>
                                <p className="font-semibold">2025 - 2029</p>
                                <p className="font-semibold">BERKELEY UNIVERSITY</p>
                                <p className="text-gray-600">Bachelor of Business Management</p>
                                <p className="text-gray-600">GPA: 3.9 / 4.0</p>
                            </div>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section>
                        <h2 className="text-[#1a365d] text-xl font-bold mb-4 border-b pb-2">SKILLS</h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>Project Management</li>
                            <li>Public Relations</li>
                            <li>Teamwork</li>
                            <li>Time Management</li>
                            <li>Leadership</li>
                            <li>Effective Communication</li>
                            <li>Critical Thinking</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-[#1a365d] text-xl font-bold mb-4 border-b pb-2">LANGUAGES</h2>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            <li>English: Fluent</li>
                            <li>French: Basic</li>
                            <li>Spanish: Intermediate</li>
                        </ul>
                    </section>
                </div>


                <div className="space-y-6">

                    <section>
                        <h2 className="text-[#1a365d] text-xl font-bold mb-4 border-b pb-2">PROFILE SUMMARY</h2>
                        <p className="text-gray-600">
                            Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in digital marketing, team leadership, and strategic problem-solving to achieve business objectives.
                        </p>
                    </section>


                    <section>
                        <h2 className="text-[#1a365d] text-xl font-bold mb-4 border-b pb-2">WORK EXPERIENCE</h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold">Borcelle Studio</h3>
                                        <p className="text-gray-600">Marketing Manager & Specialist</p>
                                    </div>
                                    <p className="text-gray-600">2030 - PRESENT</p>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    <li>Led the development and implementation of comprehensive marketing strategies that resulted in a 30% increase in brand visibility and ROI growth year-over-year</li>
                                    <li>Successfully launched and managed multiple cross-channel campaigns, including digital marketing, social media, and traditional advertising, resulting in improved customer acquisition and retention rates</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold">Fauget Studio</h3>
                                        <p className="text-gray-600">Marketing Manager & Specialist</p>
                                    </div>
                                    <p className="text-gray-600">2025 - 2029</p>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    <li>Conducted market research to identify emerging trends and consumer preferences, providing valuable insights for product development and positioning</li>
                                    <li>Oversaw the creation of engaging content for various platforms, collaborating with internal teams and external agencies to ensure brand consistency and relevance</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <h3 className="font-semibold">Studio Shadows</h3>
                                        <p className="text-gray-600">Marketing Manager & Specialist</p>
                                    </div>
                                    <p className="text-gray-600">2024 - 2025</p>
                                </div>
                                <ul className="list-disc list-inside space-y-1 text-gray-600">
                                    <li>Developed and executed targeted marketing campaigns, resulting in a 25% increase in lead generation</li>
                                    <li>Implemented SEO strategies that improved website traffic by 30%, enhancing online visibility and positioning the company</li>
                                    <li>Collaborated with sales teams to create effective sales collateral, presentations, and promotional materials</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

