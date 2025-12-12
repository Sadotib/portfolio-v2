export function tabEducation() {
  document.querySelector('#tab-skills').innerHTML = `
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
  `
}