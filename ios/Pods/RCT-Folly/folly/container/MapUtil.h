/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * MapUtil provides convenience functions to get a value from a map.
 *
 * @refcode folly/docs/examples/folly/MapUtil.cpp
 * @file MapUtil.h
 */

#pragma once

#include <tuple>

#include <fmt/format.h>

#include <folly/Optional.h>
#include <folly/Range.h>
#include <folly/functional/Invoke.h>

namespace folly {

/**
 * Given a map and a key, return the value corresponding to the key in the map,
 * or a given default value if the key doesn't exist in the map.
 */
template <typename Map, typename Key>
typename Map::mapped_type get_default(const Map& map, const Key& key) {
  auto pos = map.find(key);
  return (pos != map.end()) ? (pos->second) : (typename Map::mapped_type{});
}
template <
    class Map,
    typename Key = typename Map::key_type,
    typename Value = typename Map::mapped_type,
    typename std::enable_if<!is_invocable_v<Value>>::type* = nullptr>
typename Map::mapped_type get_default(
    const Map& map, const Key& key, Value&& dflt) {
  using M = typename Map::mapped_type;
  auto pos = map.find(key);
  return (pos != map.end()) ? pos->second
                            : static_cast<M>(static_cast<Value&&>(dflt));
}

/**
 * Give a map and a key, return the value corresponding to the key in the map,
 * or a given default value if the key doesn't exist in the map.
 */
template <
    class Map,
    typename Key = typename Map::key_type,
    typename Func,
    typename = typename std::enable_if<
        is_invocable_r_v<typename Map::mapped_type, Func>>::type>
typename Map::mapped_type get_default(
    const Map& map, const Key& key, Func&& dflt) {
  auto pos = map.find(key);
  return pos != map.end() ? pos->second : dflt();
}

/**
 * Given a map and a key, return the value corresponding to the key in the map,
 * or throw an exception of the specified type.
 */
template <
    class E = std::out_of_range,
    class Map,
    typename Key = typename Map::key_type>
const typename Map::mapped_type& get_or_throw(
    const Map& map,
    const Key& key,
    const StringPiece& exceptionStrPrefix = StringPiece()) {
  auto pos = map.find(key);
  if (pos != map.end()) {
    return pos->second;
  }
  throw_exception<E>(fmt::format("{}{}", exceptionStrPrefix, key));
}

template <
    class E = std::out_of_range,
    class Map,
    typename Key = typename Map::key_type>
typename Map::mapped_type& get_or_throw(
    Map& map,
    const Key& key,
    const StringPiece& exceptionStrPrefix = StringPiece()) {
  auto pos = map.find(key);
  if (pos != map.end()) {
    return pos->second;
  }
  throw_exception<E>(fmt::format("{}{}", exceptionStrPrefix, key));
}

/**
 * Given a map and a key, return a Optional<V> if the key exists and None if the
 * key does not exist in the map.
 */
template <
    template <typename> class Optional = folly::Optional,
    class Map,
    typename Key = typename Map::key_type>
Optional<typename Map::mapped_type> get_optional(
    const Map& map, const Key& key) {
  auto pos = map.find(key);
  if (pos != map.end()) {
    return Optional<typename Map::mapped_type>(pos->second);
  } else {
    return {};
  }
}

/**
 * Given a map and a key, return a reference to the value corresponding to the
 * key in the map, or the given default reference if the key doesn't exist in
 * the map.
 */
template <class Map, typename Key = typename Map::key_type>
const typename Map::mapped_type& get_ref_default(
    const Map& map, const Key& key, const typename Map::mapped_type& dflt) {
  auto pos = map.find(key);
  return (pos != map.end() ? pos->second : dflt);
}

/**
 * Passing a temporary default value returns a dangling reference when it is
 * returned. Lifetime extension is broken by the indirection.
 * The caller must ensure that the default value outlives the reference returned
 * by get_ref_default().
 */
template <class Map, typename Key = typename Map::key_type>
const typename Map::mapped_type& get_ref_default(
    const Map& map, const Key& key, typename Map::mapped_type&& dflt) = delete;

template <class Map, typename Key = typename Map::key_type>
const typename Map::mapped_type& get_ref_default(
    const Map& map,
    const Key& key,
    const typename Map::mapped_type&& dflt) = delete;

/**
 * Given a map and a key, return a reference to the value corresponding to the
 * key in the map, or the given default reference if the key doesn't exist in
 * the map.
 */
template <
    class Map,
    typename Key = typename Map::key_type,
    typename Func,
    typename = typename std::enable_if<
        is_invocable_r_v<const typename Map::mapped_type&, Func>>::type,
    typename = typename std::enable_if<
        std::is_reference<invoke_result_t<Func>>::value>::type>
const typename Map::mapped_type& get_ref_default(
    const Map& map, const Key& key, Func&& dflt) {
  auto pos = map.find(key);
  return (pos != map.end() ? pos->second : dflt());
}

/**
 * @brief Given a map and a key, return a pointer to the value corresponding to
 * the key in the map, or nullptr if the key doesn't exist in the map.
 */
template <class Map, typename Key = typename Map::key_type>
auto get_ptr(const Map& map, const Key& key) {
  auto pos = map.find(key);
  return (pos != map.end() ? &pos->second : nullptr);
}
template <class Map, typename Key = typename Map::key_type>
const typename Map::mapped_type* FOLLY_NULLABLE
get_ptr(const Map* FOLLY_NULLABLE map, const Key& key) {
  return map ? get_ptr(*map, key) : nullptr;
}

/**
 * Non-const overload of the above.
 */
template <class Map, typename Key = typename Map::key_type>
auto get_ptr(Map& map, const Key& key) {
  auto pos = map.find(key);
  return (pos != map.end() ? &pos->second : nullptr);
}

template <class Map, typename Key = typename Map::key_type>
typename Map::mapped_type* FOLLY_NULLABLE
get_ptr(Map* FOLLY_NULLABLE map, const Key& key) {
  return map ? get_ptr(*map, key) : nullptr;
}

/**
 * Same as `get_ptr` but for `find` variants that search for two keys at once.
 */
template <class Map, typename Key = typename Map::key_type>
std::pair<const typename Map::mapped_type*, const typename Map::mapped_type*>
get_ptr2(const Map& map, const Key& key0, const Key& key1) {
  const auto& iter_pair = map.find(key0, key1);
  auto iter0 = iter_pair.first;
  auto iter1 = iter_pair.second;
  auto end = map.end();
  return std::make_pair(
      iter0 != end ? &iter0->second : nullptr,
      iter1 != end ? &iter1->second : nullptr);
}

/**
 * Same as `get_ptr` but for `find` variants that search for two keys at once.
 */
template <class Map, typename Key = typename Map::key_type>
std::pair<typename Map::mapped_type*, typename Map::mapped_type*> get_ptr2(
    Map& map, const Key& key0, const Key& key1) {
  const auto& iter_pair = map.find(key0, key1);
  auto iter0 = iter_pair.first;
  auto iter1 = iter_pair.second;
  auto end = map.end();
  return std::make_pair(
      iter0 != end ? &iter0->second : nullptr,
      iter1 != end ? &iter1->second : nullptr);
}

// TODO: Remove the return type computations when clang 3.5 and gcc 5.1 are
// the minimum supported versions.
namespace detail {
template <
    class T,
    size_t pathLength,
    class = typename std::enable_if<(pathLength > 0)>::type>
struct NestedMapType {
  using type =
      typename NestedMapType<std::remove_pointer_t<T>, pathLength - 1>::type::
          mapped_type;
};

template <class T>
struct NestedMapType<T, 1> {
  using type = typename T::mapped_type;
};

template <typename... KeysDefault>
struct DefaultType;

template <typename Default>
struct DefaultType<Default> {
  using type = Default;
};

template <typename Key, typename... KeysDefault>
struct DefaultType<Key, KeysDefault...> {
  using type = typename DefaultType<KeysDefault...>::type;
};

template <class... KeysDefault>
auto extract_default(const KeysDefault&... keysDefault) ->
    typename DefaultType<KeysDefault...>::type const& {
  return std::get<sizeof...(KeysDefault) - 1>(std::tie(keysDefault...));
}
} // namespace detail

/**
 * Given a map of maps and a path of keys, return a Optional<V> if the nested
 * key exists and None if the nested keys does not exist in the map.
 */
template <class Map, class Key1, class Key2, class... Keys>
auto get_optional(
    const Map& map, const Key1& key1, const Key2& key2, const Keys&... keys)
    -> folly::Optional<
        typename detail::NestedMapType<Map, 2 + sizeof...(Keys)>::type> {
  auto pos = map.find(key1);
  return pos != map.end() ? get_optional(pos->second, key2, keys...)
                          : folly::none;
}

/**
 * Given a map of maps and a path of keys, return a pointer to the nested value,
 * or nullptr if the key doesn't exist in the map.
 */
template <class Map, class Key1, class Key2, class... Keys>
auto get_ptr(
    const Map& map, const Key1& key1, const Key2& key2, const Keys&... keys) ->
    typename detail::NestedMapType<Map, 2 + sizeof...(Keys)>::type
    const* FOLLY_NULLABLE {
  auto pos = map.find(key1);
  return pos != map.end() ? get_ptr(pos->second, key2, keys...) : nullptr;
}

template <class Map, class Key1, class Key2, class... Keys>
auto get_ptr(
    const Map* FOLLY_NULLABLE map,
    const Key1& key1,
    const Key2& key2,
    const Keys&... keys) ->
    typename detail::NestedMapType<Map, 2 + sizeof...(Keys)>::type
    const* FOLLY_NULLABLE {
  return map ? get_ptr(*map, key1, key2, keys...) : nullptr;
}

template <class Map, class Key1, class Key2, class... Keys>
auto get_ptr(Map& map, const Key1& key1, const Key2& key2, const Keys&... keys)
    -> typename detail::NestedMapType<Map, 2 + sizeof...(Keys)>::
        type* FOLLY_NULLABLE {
  auto pos = map.find(key1);
  return pos != map.end() ? get_ptr(pos->second, key2, keys...) : nullptr;
}

template <class Map, class Key1, class Key2, class... Keys>
auto get_ptr(
    Map* FOLLY_NULLABLE map,
    const Key1& key1,
    const Key2& key2,
    const Keys&... keys) ->
    typename detail::NestedMapType<Map, 2 + sizeof...(Keys)>::
        type* FOLLY_NULLABLE {
  return map ? get_ptr(*map, key1, key2, keys...) : nullptr;
}

/**
 * Given a map and a path of keys, return the value corresponding to the nested
 * value, or a given default value if the path doesn't exist in the map.
 * The default value is the last parameter, and is copied when returned.
 */
template <
    class Map,
    class Key1,
    class Key2,
    class... KeysDefault,
    typename = typename std::enable_if<sizeof...(KeysDefault) != 0>::type>
auto get_default(
    const Map& map,
    const Key1& key1,
    const Key2& key2,
    const KeysDefault&... keysDefault) ->
    typename detail::NestedMapType<Map, 1 + sizeof...(KeysDefault)>::type {
  if (const auto* ptr = get_ptr(map, key1)) {
    return get_default(*ptr, key2, keysDefault...);
  }
  return detail::extract_default(keysDefault...);
}

/**
 * Given a map and a path of keys, return a reference to the value corresponding
 * to the nested value, or the given default reference if the path doesn't exist
 * in the map.
 * The default value is the last parameter, and must be a lvalue reference.
 */
template <
    class Map,
    class Key1,
    class Key2,
    class... KeysDefault,
    typename = typename std::enable_if<sizeof...(KeysDefault) != 0>::type,
    typename = typename std::enable_if<std::is_lvalue_reference<
        typename detail::DefaultType<KeysDefault...>::type>::value>::type>
auto get_ref_default(
    const Map& map,
    const Key1& key1,
    const Key2& key2,
    KeysDefault&&... keysDefault) ->
    typename detail::NestedMapType<Map, 1 + sizeof...(KeysDefault)>::type
    const& {
  if (const auto* ptr = get_ptr(map, key1)) {
    return get_ref_default(*ptr, key2, keysDefault...);
  }
  return detail::extract_default(keysDefault...);
}
} // namespace folly
