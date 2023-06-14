// `app` directory
import StageLayout from "@/app/[organization]/[event]/[stage]/components/StageLayout";
import StageController from "@/services/controller/stage";
import OrganizationController from "@/services/controller/organization";
import Stage from "@/services/model/stage";
interface Params {
  stage: Stage;
}

export async function generateStaticParams() {
  const organizationController = new OrganizationController();
  const allOrganizations = await organizationController.getAllOrganizations();
  const paths = allOrganizations.map((organization) => {
    return {
      params: {
        organization: organization.id,
      },
    };
  });
  return paths;
}

export default async function Page({ params }: { params: Params }) {
  return <StageLayout stage={params.stage} />;
}
