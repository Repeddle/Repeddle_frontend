import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getNewsletterTypesService,
  sendNewsletterService,
} from "../services/newsletter";

export const useGetNewsletterTypes = () => {
  return useQuery({
    queryKey: ["newsletterTypes"],
    queryFn: getNewsletterTypesService,
  });
};

export const useSendNewsletter = () => {
  return useMutation({
    mutationFn: ({
      newsletterType,
      emails,
      customData,
    }: {
      newsletterType: string;
      emails: string[];
      customData?: Record<string, any>;
    }) => sendNewsletterService(newsletterType, emails, customData),
  });
};
