import React from "react";
import { Link, generatePath } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

interface Company {
  company:string;
}

export const ListPage: React.FC = () => {
  const [company, setCompany] = React.useState('Lemoncode');
  const [members, setMembers] = React.useState<MemberEntity[]>([]);

const searchCompany = () => {
  fetch(`https://api.github.com/orgs/${company}/members`)
    .then((response) => response.json())
    .then((json) => setMembers(json));
}

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/lemoncode/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);

  return (
    <>
      <h2>Welcome to Lemoncode</h2>
      <input value={company} onChange={((e) => setCompany(e.target.value))}></input>
      <button onClick={searchCompany}>Search</button>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                <img src={member.avatar_url} style={{ width: "5rem" }} />
              </td>
              <td>
                <span>{member.id}</span>
              </td>
              <td>
                <Link to={generatePath("/detail/:id", { id: member.login })}>
                  {member.login}
                </Link>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
