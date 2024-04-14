import { MatchContext } from "deco/blocks/matcher.ts";


export interface Props {
  nameCampaign: string;
}

export default function UtmCampaign(props: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);
  const id = url.searchParams.get("utcampaign");

  return id === props.nameCampaign ?? false;
}
