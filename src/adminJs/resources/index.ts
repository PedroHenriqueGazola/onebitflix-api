import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episode } from "../../models";
import { categoryResourceOptions } from "./category";
import { courseResourceOptions } from "./course";
import { episodeResourceOptions } from "./episode";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Course,
        options: courseResourceOptions
    },
    {
        resource: Category,
        options: categoryResourceOptions,
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
    },
]