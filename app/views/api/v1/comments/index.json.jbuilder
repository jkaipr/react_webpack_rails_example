json.array!(@comments) do |comment|
  json.extract! comment, :user_id, :text, :created_at
end
