import CreateTenant from "./CreateTenant";

export default function Invites() {
  return (
    <div className="container mx-auto flex flex-col">
      <div className="text-7xl">Invites</div>
      <div>Here, we will do some inviting for users to a tenant.</div>
      <div>
        The steps are
        <br />
        1. Create the tenant (we will automatically be joined to it since we
        created it) <br />
        2. we have some kind of known email address. The email address is
        unique, so it must be a user that already exists.
        <br />
        3. We will use that user to log in again, and we will see different page
        (the <code>{`<UserInfo />`}</code> component will have a different name)
      </div>
      <CreateTenant />
    </div>
  );
}
