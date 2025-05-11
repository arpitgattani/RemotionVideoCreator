import { AppStore, Filter } from "@/stores/app.store";
import { WritableAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

export const useFocusOnFilterAtomById = ({
  atom,
  filterId,
}: {
  atom: WritableAtom<AppStore, [AppStore], void>;
  filterId: string | null;
}) => {
  return useMemo(() => {
    return focusAtom(atom, (optic) =>
      optic.prop("filters").find((filter) => filter.id === filterId)
    );
  }, [atom, filterId]);
};

export const useFocusOnFilterConfig = ({
  atom,
  filterId,
}: {
  atom: WritableAtom<AppStore, [AppStore], void>;
  filterId: string | null;
}) => {
  return useMemo(() => {
    return focusAtom(atom, (optic) =>
      optic
        .prop("filters")
        .find((filter) => filter.id === filterId)
        .prop("config")
    );
  }, [atom, filterId]);
};
