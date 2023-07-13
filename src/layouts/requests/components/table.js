export default function RequestTable(props) {
    return (
        <>
            <table>
                <th></th>
                {props.requests.map((request) => (
                    <tr>
                        <td></td>
                    </tr>
                ))}
            </table>
        </>
    );
}
