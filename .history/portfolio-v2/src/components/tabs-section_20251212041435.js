export function tabsSection() {
  document.querySelector('#tabs-section').innerHTML = `
    <div>
        <!-- Project Section -->
    <details>
        <summary>
            Projects
        </summary>
    </details>

    <!-- Experience Section -->
    <details>
        <summary>
            Experience
        </summary>
        <table>
            <thead>
                <tr>
                    <th class="width-max">
                        Company
                    </th>
                    <th class="width-max">
                        Position & Role
                    </th>
                    <th class="width-max">
                        Duration
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Maventic Innovative Solutions Pvt. Ltd.
                    </td>
                    <td>
                        Development Trainee (SAP)
                    </td>
                    <td>
                        Nov 2025 - Present
                    </td>

                </tr>
                <tr>
                    <td>
                        Innect Technologies Pvt. Ltd.
                    </td>
                    <td>
                        Development Intern
                    </td>
                    <td>
                        June 2025 - October 2025
                    </td>
                </tr>
                <tr>
                    <td>
                        Indian Institute of Information Technology (IIITG)
                    </td>
                    <td>
                        Student Intern
                    </td>
                    <td>
                        June 2024 - July 2024
                    </td>
                </tr>
            </tbody>
        </table>

    </details>

    <!-- Skills Section -->
    <details>
        <summary>
            Skills
        </summary>
    </details>

    <!-- Education Section -->
    <details>
        <summary>
            Education
        </summary>
        <table>
            <thead>
                <tr>
                    <th class="width-max">
                        Institute
                    </th>
                    <th class="width-auto">
                        Degree & Subject
                    </th>
                    <th class="width-min">
                        Duration
                    </th>
                    <th class="width-max">
                        Location
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        Jorhat Engineering College
                    </td>
                    <td>
                        Bachelor of Technology in Computer Science and Engineering
                        <br>CGPA: 7.62
                    </td>
                    <td>
                        2022-26
                    </td>
                    <td>Jorhat, Assam</td>
                </tr>
                <tr>
                    <td>
                        Maharishi Vidya Mandir
                    </td>
                    <td>
                        10+2 Science [PCM]
                        <br>Percentage: 93.66
                    </td>
                    <td>
                        2019-21
                    </td>
                    <td>Guwahati, Assam</td>
                </tr>
            </tbody>
        </table>
    </details>
    </div>
  `
}