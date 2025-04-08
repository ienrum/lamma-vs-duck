import { render, screen } from "@testing-library/react";
import { getQueryClient } from "@/src/app/utils/get-query-client";
import { describe, expect, it } from "vitest";
import Providers from "../tanstack-query.provider";
import { useQuery } from "@tanstack/react-query";

const TestComponent = () => {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: () => Promise.resolve('data on client'),
  });

  return <div>{data}</div>;
};

describe('tanstack-query.provider', () => {
  it('should render data from query that is fetched on server', async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
      queryKey: ['test'],
      queryFn: () => Promise.resolve('data on server'),
    });

    render(
      <Providers>
        <TestComponent />
      </Providers>,
    );
    expect(screen.getByText('data on server')).toBeDefined();
  });
});