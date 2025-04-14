import JumbotronComponent from "@/components/jumbotron";
import ShowCourses from "@/components/show-courses";
import UserClientComponent from "@/components/user/user-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("User");
const UserPage = () => {
  return (
    <>
      <>
        <UserClientComponent>
          <JumbotronComponent text="User Dashboard" />{" "}
          <ShowCourses
            singleCardRedirect="/user/course/"
            url="/course/user-courses"
          />
        </UserClientComponent>
      </>
    </>
  );
};

export default UserPage;
