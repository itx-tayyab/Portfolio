import type { ProjectDeepDive } from "@/data/deepDiveTypes";
import { harmoniDeepDive } from "@/data/deepDives/harmoni";
import { clientBridgeDeepDive } from "@/data/deepDives/clientbridge";
import { deepKhataDeepDive } from "@/data/deepDives/deepkhata";
import { deepDevErpDeepDive } from "@/data/deepDives/deepdevErp";

/** Case-study deep-dive content keyed by project slug. */
export const projectDeepDives: Record<string, ProjectDeepDive> = {
  harmoni: harmoniDeepDive,
  clientbridge: clientBridgeDeepDive,
  deepkhata: deepKhataDeepDive,
  "deepdev-erp": deepDevErpDeepDive,
};

export function getProjectDeepDive(slug: string): ProjectDeepDive | undefined {
  return projectDeepDives[slug];
}
