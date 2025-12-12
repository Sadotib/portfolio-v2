import { tabProject } from "./tab-project";

export function tabExperience() {
  document.querySelector('#tabs-section').innerHTML = `
    ${tabProject}
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
  `
}